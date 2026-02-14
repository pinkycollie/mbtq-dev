import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricData {
  name: string;
  value: number;
}

export default function DashboardMetrics() {
  // Mock data - in real app, this would come from API
  const caseLoadData: MetricData[] = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 58 },
    { name: 'May', value: 62 },
    { name: 'Jun', value: 65 },
  ];

  const outcomeData: MetricData[] = [
    { name: 'Employment', value: 75 },
    { name: 'Education', value: 15 },
    { name: 'Self-Employment', value: 5 },
    { name: 'Other', value: 5 },
  ];

  const serviceUtilizationData: MetricData[] = [
    { name: 'Counseling', value: 92 },
    { name: 'Job Training', value: 78 },
    { name: 'ASL Services', value: 65 },
    { name: 'Assistive Tech', value: 45 },
    { name: 'Mental Health', value: 38 },
  ];

  const COLORS = ['#e60088', '#0050b7', '#10b981', '#f59e0b', '#8b5cf6'];

  const complianceStatus = {
    rsa911: 'compliant',
    accessibility: 'compliant',
    dataPrivacy: 'compliant'
  };

  const getComplianceColor = (status: string): string => {
    return status === 'compliant' ? 'text-green-600 bg-green-100' : 'text-amber-600 bg-amber-100';
  };

  const getComplianceIcon = (status: string): string => {
    return status === 'compliant' ? '✓' : '⚠';
  };

  return (
    <section 
      className="mb-8 space-y-6"
      aria-labelledby="metrics-heading"
    >
      <h2 id="metrics-heading" className="text-xl font-bold text-gray-900 mb-4">
        Performance Metrics
      </h2>

      {/* Case Load Indicators */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Case Load Trend (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={caseLoadData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="#e60088" 
              name="Total Cases" 
              aria-label="Case load by month"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Split layout for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outcome Success Rates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Outcome Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={outcomeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                aria-label="Outcome success rates"
              >
                {outcomeData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Utilization */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Service Utilization Rates
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceUtilizationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#0050b7" 
                name="Utilization %"
                aria-label="Service utilization percentages"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RSA-911 Compliance Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Compliance Status Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg ${getComplianceColor(complianceStatus.rsa911)}`}
            role="status"
            aria-label="RSA-911 compliance status"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">RSA-911 Reports</span>
              <span className="text-2xl" aria-hidden="true">
                {getComplianceIcon(complianceStatus.rsa911)}
              </span>
            </div>
            <p className="text-sm mt-2">All reports up to date</p>
          </div>

          <div 
            className={`p-4 rounded-lg ${getComplianceColor(complianceStatus.accessibility)}`}
            role="status"
            aria-label="Accessibility compliance status"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Accessibility (WCAG 2.1)</span>
              <span className="text-2xl" aria-hidden="true">
                {getComplianceIcon(complianceStatus.accessibility)}
              </span>
            </div>
            <p className="text-sm mt-2">Full AA compliance</p>
          </div>

          <div 
            className={`p-4 rounded-lg ${getComplianceColor(complianceStatus.dataPrivacy)}`}
            role="status"
            aria-label="Data privacy compliance status"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Data Privacy</span>
              <span className="text-2xl" aria-hidden="true">
                {getComplianceIcon(complianceStatus.dataPrivacy)}
              </span>
            </div>
            <p className="text-sm mt-2">HIPAA compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
}
