"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { usageData } from "@/data/usageData"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo } from "react"

const uniqueInstanceTypes = Array.from(new Set(usageData.map(item => item.instanceType)))
const uniqueBillingPeriods = Array.from(new Set(usageData.map(item => item.billingPeriod)))
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

export default function DashboardPage() {
  const [selectedInstanceType, setSelectedInstanceType] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return usageData.filter(item => {
      const matchesInstance = selectedInstanceType === "all" || item.instanceType === selectedInstanceType
      const matchesPeriod = selectedPeriod === "all" || item.billingPeriod === selectedPeriod
      const matchesTeam = selectedTeam === "all" || item.team === selectedTeam
      return matchesInstance && matchesPeriod && matchesTeam
    })
  }, [selectedInstanceType, selectedPeriod, selectedTeam])

  // Calculate metrics based on filtered data
  const totalCost = filteredData.reduce((sum, item) => sum + item.totalCost, 0)
  const totalHours = filteredData.reduce((sum, item) => sum + item.usageHours, 0)
  const activeInstances = filteredData.filter(item => item.status === "Active").length
  const avgCostPerHour = totalHours > 0 ? totalCost / totalHours : 0

  // Prepare data for instance type distribution
  const instanceTypeData = Object.entries(
    filteredData.reduce((acc, item) => {
      acc[item.instanceType] = (acc[item.instanceType] || 0) + item.usageHours
      return acc
    }, {} as Record<string, number>)
  ).map(([name, hours]) => ({ name, hours }))

  // Prepare data for monthly usage trend
  const monthlyData = Object.entries(
    filteredData.reduce((acc, item) => {
      acc[item.billingPeriod] = {
        period: item.billingPeriod,
        hours: (acc[item.billingPeriod]?.hours || 0) + item.usageHours,
        cost: (acc[item.billingPeriod]?.cost || 0) + item.totalCost
      }
      return acc
    }, {} as Record<string, { period: string; hours: number; cost: number }>)
  ).map(([_, data]) => data)
  .sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime())

  // Prepare data for team cost distribution
  const teamCostData = Object.entries(
    filteredData.reduce((acc, item) => {
      acc[item.team] = (acc[item.team] || 0) + item.totalCost
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value)

  // Prepare data for team instance type usage
  const teamInstanceTypeData = filteredData.reduce((acc, item) => {
    if (!acc[item.team]) {
      acc[item.team] = {}
    }
    acc[item.team][item.instanceType] = (acc[item.team][item.instanceType] || 0) + item.usageHours
    return acc
  }, {} as Record<string, Record<string, number>>)

  const stackedBarData = Object.entries(teamInstanceTypeData).map(([team, instances]) => ({
    team,
    ...instances
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57']

  const metrics = [
    { 
      title: "Total Cost", 
      value: `$${totalCost.toFixed(2)}`,
      description: "Across all instances"
    },
    { 
      title: "Active Instances", 
      value: activeInstances,
      description: "Currently running"
    },
    { 
      title: "Total Usage", 
      value: `${totalHours.toFixed(1)}h`,
      description: "Compute hours"
    },
    { 
      title: "Avg. Cost/Hour", 
      value: `$${avgCostPerHour.toFixed(2)}`,
      description: "Per instance hour"
    },
  ]

  // Get unique teams
  const teams = [...new Set(usageData.map(item => item.team))].sort()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Overview of your compute usage and costs
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-[200px]">
            <Select
              value={selectedTeam}
              onValueChange={setSelectedTeam}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select
              value={selectedInstanceType}
              onValueChange={setSelectedInstanceType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select instance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Instance Types</SelectItem>
                {uniqueInstanceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select billing period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                {uniqueBillingPeriods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Instance Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instanceTypeData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="hours"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                    name="Usage Hours"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period"
                    stroke="#888888"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    yAxisId="left"
                    tickFormatter={(value) => `${value}h`}
                  />
                  <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    fill="#8884d8"
                    stroke="#8884d8"
                    yAxisId="left"
                    name="Usage Hours"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    fill="#82ca9d"
                    stroke="#82ca9d"
                    yAxisId="right"
                    name="Total Cost"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamCostData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {teamCostData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Instance Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackedBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="team" 
                    stroke="#888888"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip />
                  <Legend />
                  {Object.keys(teamInstanceTypeData[Object.keys(teamInstanceTypeData)[0]] || {}).map((instance, index) => (
                    <Bar
                      key={instance}
                      dataKey={instance}
                      stackId="a"
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
