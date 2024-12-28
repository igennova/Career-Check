"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Navbar } from "@/components/navbar"

// Define the data structure
interface PlacementRecord {
  RollNumber: string
  Name: string
  FinalOffer: string
  "CTC (LPA)": string
}

export default function PlacementsPage() {
  const [placementData, setPlacementData] = useState<PlacementRecord[]>([])
  const [filteredData, setFilteredData] = useState<PlacementRecord[]>([])
  const [filters, setFilters] = useState({
    year: "2023",
    branch: "cumulative",
    name: "",
    companies: [] as string[],
    ctcRange: { min: "", max: "" },
  })

  useEffect(() => {
    // Load JSON data once
    async function fetchData() {
      const response = await fetch(
        `https://career-check.vercel.app/data/${filters.year}/${filters.branch}.json`
      )
      const data = await response.json()
      setPlacementData(data)
      setFilteredData(data)
    }

    fetchData()
  }, [filters.year, filters.branch])

  useEffect(() => {
    // Apply filters
    const { name, companies, ctcRange } = filters
    const filtered = placementData.filter((record) => {
      const matchesName = name
        ? record.Name.toLowerCase().includes(name.toLowerCase())
        : true
      const matchesCompany =
        companies.length > 0 ? companies.includes(record.FinalOffer) : true
      const matchesCTC =
        (ctcRange.min ? +record["CTC (LPA)"] >= +ctcRange.min : true) &&
        (ctcRange.max ? +record["CTC (LPA)"] <= +ctcRange.max : true)

      return matchesName && matchesCompany && matchesCTC
    })
    setFilteredData(filtered)
  }, [filters, placementData])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Year and Branch Selection */}
          <div className="flex gap-4">
            {["2021", "2022", "2023"].map((year) => (
              <Button
                key={year}
                variant={filters.year === year ? "default" : "secondary"}
                onClick={() => handleFilterChange("year", year)}
              >
                {year}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {["cumulative", "cse", "it", "ece", "mae", "barch"].map((branch) => (
              <Button
                key={branch}
                variant={filters.branch === branch ? "default" : "secondary"}
                onClick={() => handleFilterChange("branch", branch)}
              >
                {branch}
              </Button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name Search */}
            <Input
              placeholder="Search by Name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />

            {/* CTC Range */}
            <div className="flex gap-2">
              <Input
                placeholder="Min CTC"
                value={filters.ctcRange.min}
                onChange={(e) =>
                  handleFilterChange("ctcRange", {
                    ...filters.ctcRange,
                    min: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Max CTC"
                value={filters.ctcRange.max}
                onChange={(e) =>
                  handleFilterChange("ctcRange", {
                    ...filters.ctcRange,
                    max: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Results Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Final Offer</TableHead>
                <TableHead>CTC (Lakh)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.RollNumber}>
                  <TableCell>{row.RollNumber}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.FinalOffer}</TableCell>
                  <TableCell>{row["CTC (LPA)"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
