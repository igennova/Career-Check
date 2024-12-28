import type { CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData, CTCRange } from './types';

export function calculateCTCRanges(data: CompanyPlacementData[]): CTCRange[] {
    const ranges = [
        { range: '<6 LPA', count: 0 },
        { range: '6-10 LPA', count: 0 },
        { range: '10-20 LPA', count: 0 },
        { range: '>20 LPA', count: 0 }
    ];

    data.forEach(item => {
        const ctc = item["CTC (LPA)"];
        if (ctc < 6) ranges[0].count++;
        else if (ctc >= 6 && ctc < 10) ranges[1].count++;
        else if (ctc >= 10 && ctc < 20) ranges[2].count++;
        else ranges[3].count++;
    });

    return ranges;
}

export function calculateAverages(data: CompanyPlacementData[]) {
    const ctcs = data.map(item => item["CTC (LPA)"]);
    const avg = ctcs.reduce((a, b) => a + b, 0) / ctcs.length;
    const max = Math.max(...ctcs);
    return { average: avg, highest: max };
}

export function calculateStipendStats(data: CompanyInternshipData[]) {
    const stipends = data.map(item => item["Stipend (INR per month)"]);
    const avg = stipends.reduce((a, b) => a + b, 0) / stipends.length;
    const max = Math.max(...stipends);
    return { average: avg, highest: max };
}

export function calculateBranchStats(
    placementData: BranchPlacementData[],
    internshipData: BranchInternshipData[]
) {
    const stats = new Map();

    placementData.forEach(item => {
        if (!stats.has(item.Branch)) {
            stats.set(item.Branch, {
                totalStudents: item["Total Students"],
                placedStudents: item["Placed Students"],
                sixMonthInterns: item["6 Month Interns"],
                highestCTC: item["Highest CTC (LPA)"],
                highestCTCCompany: item["Highest CTC Company"]
            });
        }
    });

    internshipData.forEach(item => {
        if (stats.has(item.Branch)) {
            stats.get(item.Branch).internedStudents = item["Interned Students"];
            stats.get(item.Branch).highestStipend = item["Highest Stipend (LPM)"];
            stats.get(item.Branch).highestStipendCompany = item["Highest Stipend Company"];
        }
    });

    return Array.from(stats.entries()).map(([branch, data]) => ({
        branch,
        ...data
    }));
}

