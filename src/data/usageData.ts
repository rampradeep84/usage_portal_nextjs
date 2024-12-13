export interface Usage {
  id: number
  team: string
  instanceType: string
  usageHours: number
  costPerHour: number
  totalCost: number
  billingPeriod: string
  status: string
}

export const usageData: Usage[] = [
  {
    id: 1,
    team: "ML Research",
    instanceType: "p4d.24xlarge",
    usageHours: 245.5,
    costPerHour: 32.77,
    totalCost: 8045.04,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 2,
    team: "Data Science",
    instanceType: "p3.16xlarge",
    usageHours: 180.2,
    costPerHour: 24.48,
    totalCost: 4411.30,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 3,
    team: "Computer Vision",
    instanceType: "g5.12xlarge",
    usageHours: 320.8,
    costPerHour: 15.12,
    totalCost: 4850.50,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 4,
    team: "NLP Team",
    instanceType: "g4dn.12xlarge",
    usageHours: 156.4,
    costPerHour: 12.24,
    totalCost: 1914.34,
    billingPeriod: "Nov 2023",
    status: "Active"
  },
  {
    id: 5,
    team: "Recommendation",
    instanceType: "c6i.32xlarge",
    usageHours: 278.6,
    costPerHour: 5.44,
    totalCost: 1515.58,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 6,
    team: "MLOps",
    instanceType: "p4d.24xlarge",
    usageHours: 412.3,
    costPerHour: 32.77,
    totalCost: 13511.07,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 7,
    team: "AI Infrastructure",
    instanceType: "p3.16xlarge",
    usageHours: 267.8,
    costPerHour: 24.48,
    totalCost: 6555.74,
    billingPeriod: "Dec 2023",
    status: "Suspended"
  },
  {
    id: 8,
    team: "Deep Learning",
    instanceType: "g5.12xlarge",
    usageHours: 189.5,
    costPerHour: 15.12,
    totalCost: 2865.24,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 9,
    team: "Model Training",
    instanceType: "g4dn.12xlarge",
    usageHours: 345.2,
    costPerHour: 12.24,
    totalCost: 4225.25,
    billingPeriod: "Nov 2023",
    status: "Active"
  },
  {
    id: 10,
    team: "Analytics",
    instanceType: "c6i.32xlarge",
    usageHours: 156.7,
    costPerHour: 5.44,
    totalCost: 852.45,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 11,
    team: "ML Research",
    instanceType: "g5.12xlarge",
    usageHours: 198.4,
    costPerHour: 15.12,
    totalCost: 2999.81,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 12,
    team: "ML Research",
    instanceType: "p3.16xlarge",
    usageHours: 287.6,
    costPerHour: 24.48,
    totalCost: 7040.45,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 13,
    team: "Data Science",
    instanceType: "g4dn.12xlarge",
    usageHours: 167.3,
    costPerHour: 12.24,
    totalCost: 2047.75,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 14,
    team: "Data Science",
    instanceType: "c6i.32xlarge",
    usageHours: 234.5,
    costPerHour: 5.44,
    totalCost: 1275.68,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 15,
    team: "Computer Vision",
    instanceType: "p4d.24xlarge",
    usageHours: 312.8,
    costPerHour: 32.77,
    totalCost: 10250.46,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 16,
    team: "Computer Vision",
    instanceType: "g5.12xlarge",
    usageHours: 178.9,
    costPerHour: 15.12,
    totalCost: 2705.97,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 17,
    team: "NLP Team",
    instanceType: "p3.16xlarge",
    usageHours: 289.4,
    costPerHour: 24.48,
    totalCost: 7084.51,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 18,
    team: "NLP Team",
    instanceType: "g4dn.12xlarge",
    usageHours: 145.6,
    costPerHour: 12.24,
    totalCost: 1782.14,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 19,
    team: "MLOps",
    instanceType: "g5.12xlarge",
    usageHours: 267.9,
    costPerHour: 15.12,
    totalCost: 4050.65,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 20,
    team: "MLOps",
    instanceType: "c6i.32xlarge",
    usageHours: 189.2,
    costPerHour: 5.44,
    totalCost: 1029.25,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 21,
    team: "AI Infrastructure",
    instanceType: "g4dn.12xlarge",
    usageHours: 412.7,
    costPerHour: 12.24,
    totalCost: 5051.45,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 22,
    team: "AI Infrastructure",
    instanceType: "g5.12xlarge",
    usageHours: 156.8,
    costPerHour: 15.12,
    totalCost: 2370.82,
    billingPeriod: "Nov 2023",
    status: "Completed"
  },
  {
    id: 23,
    team: "Deep Learning",
    instanceType: "p3.16xlarge",
    usageHours: 345.6,
    costPerHour: 24.48,
    totalCost: 8460.29,
    billingPeriod: "Dec 2023",
    status: "Active"
  },
  {
    id: 24,
    team: "Deep Learning",
    instanceType: "c6i.32xlarge",
    usageHours: 198.3,
    costPerHour: 5.44,
    totalCost: 1078.75,
    billingPeriod: "Oct 2023",
    status: "Completed"
  },
  {
    id: 25,
    team: "ML Research",
    instanceType: "p4d.24xlarge",
    usageHours: 412.3,
    costPerHour: 32.77,
    totalCost: 13511.07,
    billingPeriod: "Nov 2023",
    status: "Completed"
  }
]
