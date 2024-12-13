"use client"

import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo } from "react"
import { Usage, usageData } from "@/data/usageData"

export default function UsagePage() {
  const [selectedInstanceType, setSelectedInstanceType] = useState<string>("all")
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")

  const filteredData = useMemo(() => {
    return usageData.filter(item => {
      const matchesInstance = selectedInstanceType === "all" || item.instanceType === selectedInstanceType
      const matchesPeriod = selectedBillingPeriod === "all" || item.billingPeriod === selectedBillingPeriod
      const matchesTeam = selectedTeam === "all" || item.team === selectedTeam
      return matchesInstance && matchesPeriod && matchesTeam
    })
  }, [selectedInstanceType, selectedBillingPeriod, selectedTeam])

  // Get unique instance types, billing periods, and teams for filters
  const instanceTypes = [...new Set(usageData.map(item => item.instanceType))]
  const billingPeriods = [...new Set(usageData.map(item => item.billingPeriod))]
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const teams = [...new Set(usageData.map(item => item.team))].sort()

  const columns: ColumnDef<Usage>[] = [
    {
      accessorKey: "team",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-8 items-center justify-start p-0 font-medium"
          >
            Team
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("team")}</div>
    },
    {
      accessorKey: "instanceType",
      header: "Instance Type",
      cell: ({ row }) => <div className="text-left">{row.getValue("instanceType")}</div>
    },
    {
      accessorKey: "usageHours",
      header: ({ column, table }) => {
        const filteredRows = table.getFilteredRowModel().rows
        const totalHours = filteredRows.reduce((sum, row) => sum + row.original.usageHours, 0).toFixed(1)
        return (
          <div>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex h-8 items-center justify-start p-0 font-medium"
            >
              Usage Hours
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-xs text-muted-foreground mt-1">
              Sum: {totalHours}
            </div>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("usageHours")}</div>
    },
    {
      accessorKey: "costPerHour",
      header: "Cost/Hour",
      cell: ({ row }) => <div className="text-left">${row.getValue("costPerHour")}</div>
    },
    {
      accessorKey: "totalCost",
      header: ({ column, table }) => {
        const filteredRows = table.getFilteredRowModel().rows
        const totalCost = filteredRows.reduce((sum, row) => sum + row.original.totalCost, 0).toFixed(2)
        return (
          <div>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex h-8 items-center justify-start p-0 font-medium"
            >
              Total Cost
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-xs text-muted-foreground mt-1">
              Sum: ${totalCost}
            </div>
          </div>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalCost"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-left">{formatted}</div>;
      }
    },
    {
      accessorKey: "billingPeriod",
      header: "Billing Period",
      cell: ({ row }) => <div className="text-left">{row.getValue("billingPeriod")}</div>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case 'active':
              return 'bg-green-100 text-green-800'
            case 'completed':
              return 'bg-blue-100 text-blue-800'
            case 'suspended':
              return 'bg-yellow-100 text-yellow-800'
            default:
              return 'bg-gray-100 text-gray-800'
          }
        }
        return (
          <div className="text-left">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        )
      }
    },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex gap-4 mb-6">
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
              <SelectValue placeholder="Select Instance Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instance Types</SelectItem>
              {instanceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[200px]">
          <Select
            value={selectedBillingPeriod}
            onValueChange={setSelectedBillingPeriod}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Billing Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              {billingPeriods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="p-0">
        <DataTable columns={columns} data={filteredData} />
      </Card>
    </div>
  )
}
