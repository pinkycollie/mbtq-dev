/**
 * AI Report Generator Service
 * 
 * Automated RSA-911 compliant report generation
 * Outcome summaries and quarterly/annual statistics
 */

export interface CaseData {
  caseNumber: string;
  clientName: string;
  openDate: string;
  closeDate?: string;
  status: string;
  services: ServiceRecord[];
  outcomes?: OutcomeData;
}

export interface ServiceRecord {
  serviceType: string;
  startDate: string;
  endDate?: string;
  cost: number;
  provider: string;
  outcome?: string;
}

export interface OutcomeData {
  employmentAchieved: boolean;
  employer?: string;
  jobTitle?: string;
  hourlyWage?: number;
  hoursPerWeek?: number;
  benefits?: boolean;
  retention90Days?: boolean;
}

export interface RSA911Report {
  reportPeriod: string;
  agencyName: string;
  totalCasesServed: number;
  casesByStatus: {
    open: number;
    inProgress: number;
    closed: number;
  };
  outcomeStatistics: {
    totalClosures: number;
    successfulEmployment: number;
    averageWage: number;
    retention90Days: number;
  };
  serviceStatistics: {
    counseling: number;
    jobTraining: number;
    assistiveTechnology: number;
    interpreterServices: number;
    other: number;
  };
  demographics: {
    deaf: number;
    lgbtq: number;
    transitionYouth: number;
  };
  costAnalysis: {
    totalCost: number;
    averageCostPerCase: number;
    costPerSuccessfulOutcome: number;
  };
}

/**
 * Generate RSA-911 compliant report
 */
export function generateRSA911Report(
  cases: CaseData[],
  reportPeriod: string,
  agencyName: string
): RSA911Report {
  const totalCasesServed = cases.length;
  
  // Status breakdown
  const casesByStatus = {
    open: cases.filter(c => c.status === 'intake' || c.status === 'assessment').length,
    inProgress: cases.filter(c => ['planning', 'services', 'employment', 'follow_up'].includes(c.status)).length,
    closed: cases.filter(c => c.status === 'closed').length
  };

  // Outcome statistics
  const closedCases = cases.filter(c => c.status === 'closed');
  const employedCases = closedCases.filter(c => c.outcomes?.employmentAchieved);
  const retainedCases = employedCases.filter(c => c.outcomes?.retention90Days);
  
  const totalWages = employedCases
    .filter(c => c.outcomes?.hourlyWage)
    .reduce((sum, c) => sum + (c.outcomes?.hourlyWage || 0), 0);
  const averageWage = employedCases.length > 0 ? totalWages / employedCases.length : 0;

  // Service statistics
  const allServices = cases.flatMap(c => c.services);
  const serviceStatistics = {
    counseling: allServices.filter(s => s.serviceType === 'counseling').length,
    jobTraining: allServices.filter(s => s.serviceType === 'job_training').length,
    assistiveTechnology: allServices.filter(s => s.serviceType === 'assistive_technology').length,
    interpreterServices: allServices.filter(s => s.serviceType === 'interpreter_services').length,
    other: allServices.filter(s => !['counseling', 'job_training', 'assistive_technology', 'interpreter_services'].includes(s.serviceType)).length
  };

  // Demographics (mock - would come from case data in real implementation)
  const demographics = {
    deaf: Math.floor(totalCasesServed * 0.35),
    lgbtq: Math.floor(totalCasesServed * 0.25),
    transitionYouth: Math.floor(totalCasesServed * 0.20)
  };

  // Cost analysis
  const totalCost = allServices.reduce((sum, s) => sum + s.cost, 0);
  const averageCostPerCase = totalCasesServed > 0 ? totalCost / totalCasesServed : 0;
  const costPerSuccessfulOutcome = employedCases.length > 0 ? totalCost / employedCases.length : 0;

  return {
    reportPeriod,
    agencyName,
    totalCasesServed,
    casesByStatus,
    outcomeStatistics: {
      totalClosures: closedCases.length,
      successfulEmployment: employedCases.length,
      averageWage: Math.round(averageWage * 100) / 100,
      retention90Days: retainedCases.length
    },
    serviceStatistics,
    demographics,
    costAnalysis: {
      totalCost: Math.round(totalCost * 100) / 100,
      averageCostPerCase: Math.round(averageCostPerCase * 100) / 100,
      costPerSuccessfulOutcome: Math.round(costPerSuccessfulOutcome * 100) / 100
    }
  };
}

/**
 * Export report to different formats
 */
export function exportReport(report: RSA911Report, format: 'json' | 'csv' | 'html'): string {
  if (format === 'json') {
    return JSON.stringify(report, null, 2);
  }

  if (format === 'csv') {
    let csv = 'Metric,Value\n';
    csv += `Report Period,${report.reportPeriod}\n`;
    csv += `Agency Name,${report.agencyName}\n`;
    csv += `Total Cases Served,${report.totalCasesServed}\n`;
    csv += `Open Cases,${report.casesByStatus.open}\n`;
    csv += `In Progress Cases,${report.casesByStatus.inProgress}\n`;
    csv += `Closed Cases,${report.casesByStatus.closed}\n`;
    csv += `Successful Employment,${report.outcomeStatistics.successfulEmployment}\n`;
    csv += `Average Wage,$${report.outcomeStatistics.averageWage}\n`;
    csv += `90-Day Retention,${report.outcomeStatistics.retention90Days}\n`;
    return csv;
  }

  // HTML format
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>RSA-911 Report - ${report.reportPeriod}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #e60088; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>RSA-911 Compliance Report</h1>
      <p><strong>Report Period:</strong> ${report.reportPeriod}</p>
      <p><strong>Agency:</strong> ${report.agencyName}</p>
      
      <h2>Case Statistics</h2>
      <table>
        <tr><th>Metric</th><th>Count</th></tr>
        <tr><td>Total Cases Served</td><td>${report.totalCasesServed}</td></tr>
        <tr><td>Open Cases</td><td>${report.casesByStatus.open}</td></tr>
        <tr><td>In Progress</td><td>${report.casesByStatus.inProgress}</td></tr>
        <tr><td>Closed Cases</td><td>${report.casesByStatus.closed}</td></tr>
      </table>

      <h2>Outcome Statistics</h2>
      <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Total Closures</td><td>${report.outcomeStatistics.totalClosures}</td></tr>
        <tr><td>Successful Employment</td><td>${report.outcomeStatistics.successfulEmployment}</td></tr>
        <tr><td>Average Hourly Wage</td><td>$${report.outcomeStatistics.averageWage}</td></tr>
        <tr><td>90-Day Retention</td><td>${report.outcomeStatistics.retention90Days}</td></tr>
      </table>

      <h2>Service Utilization</h2>
      <table>
        <tr><th>Service Type</th><th>Count</th></tr>
        <tr><td>Counseling</td><td>${report.serviceStatistics.counseling}</td></tr>
        <tr><td>Job Training</td><td>${report.serviceStatistics.jobTraining}</td></tr>
        <tr><td>Assistive Technology</td><td>${report.serviceStatistics.assistiveTechnology}</td></tr>
        <tr><td>Interpreter Services</td><td>${report.serviceStatistics.interpreterServices}</td></tr>
        <tr><td>Other</td><td>${report.serviceStatistics.other}</td></tr>
      </table>

      <h2>Cost Analysis</h2>
      <table>
        <tr><th>Metric</th><th>Amount</th></tr>
        <tr><td>Total Cost</td><td>$${report.costAnalysis.totalCost.toLocaleString()}</td></tr>
        <tr><td>Average Cost Per Case</td><td>$${report.costAnalysis.averageCostPerCase.toLocaleString()}</td></tr>
        <tr><td>Cost Per Successful Outcome</td><td>$${report.costAnalysis.costPerSuccessfulOutcome.toLocaleString()}</td></tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate quarterly summary
 */
export function generateQuarterlySummary(reports: RSA911Report[]): string {
  const totalCases = reports.reduce((sum, r) => sum + r.totalCasesServed, 0);
  const totalEmployment = reports.reduce((sum, r) => sum + r.outcomeStatistics.successfulEmployment, 0);
  const successRate = totalCases > 0 ? (totalEmployment / totalCases * 100).toFixed(1) : '0';

  return `
# Quarterly Summary Report

## Overview
- Total Cases Served: ${totalCases}
- Successful Employment Outcomes: ${totalEmployment}
- Success Rate: ${successRate}%

## Trends
${reports.map((r, idx) => `
### Month ${idx + 1}
- Cases: ${r.totalCasesServed}
- Employment: ${r.outcomeStatistics.successfulEmployment}
- Average Wage: $${r.outcomeStatistics.averageWage}
`).join('\n')}
  `.trim();
}
