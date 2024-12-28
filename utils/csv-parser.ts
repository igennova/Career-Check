import { parse } from 'csv-parse/sync'
import fs from 'fs/promises'

export interface PlacementRecord {
  RollNumber: string
  Name: string
  FinalOffer: string
  "CTC (LPA)": string
}

export async function readCSVFile(year: string, branch: string): Promise<PlacementRecord[]> {
  try {
    if (branch === 'cumulative') {
      const branches = ['cse', 'it', 'ece', 'mae'];
      if (year === '2023') {
        branches.push('barch');
      }
      let allData: PlacementRecord[] = [];
      for (const b of branches) {
        const filePath = `data/${year}/${b}.csv`;
        const fileContent = await fs.readFile(filePath, 'utf-8');
        allData = allData.concat(parse(fileContent, {
          columns: true,
          skip_empty_lines: true
        }) as PlacementRecord[]);
      }
      return allData;
    } else {
      const filePath = `data/${year}/${branch.toLowerCase()}.csv`;
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      }) as PlacementRecord[];
    }
  } catch (error) {
    console.error(`Error reading CSV file: ${error}`);
    return [];
  }
}

export function filterPlacementData(
  data: PlacementRecord[],
  filters: {
    name?: string
    companies?: string[]
    ctcRange?: { min: string; max: string }
  }
): PlacementRecord[] {
  return data.filter((record) => {
    // Name filter
    if (filters.name && !record.Name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Companies filter
    if (
      filters.companies?.length &&
      !filters.companies.includes(record.FinalOffer)
    ) {
      return false
    }

    // CTC range filter
    if (filters.ctcRange?.min || filters.ctcRange?.max) {
      const ctc = parseFloat(record["CTC (LPA)"])
      if (
        filters.ctcRange.min &&
        ctc < parseFloat(filters.ctcRange.min)
      ) {
        return false
      }
      if (
        filters.ctcRange.max &&
        ctc > parseFloat(filters.ctcRange.max)
      ) {
        return false
      }
    }

    return true
  })
}