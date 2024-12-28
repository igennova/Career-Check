import { NextResponse } from 'next/server'
import { readCSVFile, filterPlacementData, type PlacementRecord } from '@/utils/csv-parser'

export async function POST(request: Request) {
  try {
    const {
      year,
      branch,
      name,
      companies,
      ctcRange
    } = await request.json()
    

    let data: PlacementRecord[] = await readCSVFile(year, branch)
    
    
    // Apply filters
    data = filterPlacementData(data, {
      name,
      companies,
      ctcRange
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error processing placement data:', error)
    return NextResponse.json(
      { error: 'Failed to process placement data lucky you' },
      { status: 500 }
    )
  }
}

