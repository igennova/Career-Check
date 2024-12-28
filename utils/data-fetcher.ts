import type { CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData } from './types';

// Fetch data for a specific year for companies
export async function fetchCompanyData(year: string) {
  try {
    const placementsResponse = await fetch(`/data/companies_data/placements_${year}.json`);
    const internshipsResponse = await fetch(`/data/companies_data/internships_${year}.json`);
    
    if (!placementsResponse.ok || !internshipsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const placements: CompanyPlacementData[] = await placementsResponse.json();
    const internships: CompanyInternshipData[] = await internshipsResponse.json();

    // Add Year to each item
    placements.forEach(item => item.Year = year);
    internships.forEach(item => item.Year = year);

    return { placements, internships };
  } catch (error) {
    console.error('Error fetching company data:', error);
    return { placements: [], internships: [] };
  }
}

// Fetch data for a specific year for branches
export async function fetchBranchData(year: string) {
  try {
    const placementsResponse = await fetch(`/data/branches_data/placement_${year}.json`);
    const internshipsResponse = await fetch(`/data/branches_data/internship_${year}.json`);
    
    if (!placementsResponse.ok || !internshipsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const placements: BranchPlacementData[] = await placementsResponse.json();
    const internships: BranchInternshipData[] = await internshipsResponse.json();

    // Add Year to each item
    placements.forEach(item => item.Year = year);
    internships.forEach(item => item.Year = year);

    return { placements, internships };
  } catch (error) {
    console.error('Error fetching branch data:', error);
    return { placements: [], internships: [] };
  }
}

// Fetch data for all years (2021, 2022, 2023)
export async function fetchAllYearsData() {
  const years = ['2021', '2022', '2023'];
  const allData = {
    companies: {
      placements: [] as CompanyPlacementData[],
      internships: [] as CompanyInternshipData[]
    },
    branches: {
      placements: [] as BranchPlacementData[],
      internships: [] as BranchInternshipData[]
    }
  };

  for (const year of years) {
    const companyData = await fetchCompanyData(year);
    const branchData = await fetchBranchData(year);

    allData.companies.placements.push(...companyData.placements);
    allData.companies.internships.push(...companyData.internships);
    allData.branches.placements.push(...branchData.placements);
    allData.branches.internships.push(...branchData.internships);
  }

  return allData;
}
