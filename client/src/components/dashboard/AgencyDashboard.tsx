import { useState } from 'react';
import { Users, Briefcase, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import DashboardMetrics from './DashboardMetrics';
import AgencySelector from './AgencySelector';

export type UserRole = 'admin' | 'supervisor' | 'counselor' | 'client';

interface DashboardProps {
  userRole?: UserRole;
  userName?: string;
  agencyName?: string;
}

interface CaseStats {
  open: number;
  inProgress: number;
  closed: number;
  total: number;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  ariaLabel: string;
}

interface Activity {
  id: string;
  type: 'case_created' | 'case_updated' | 'service_added' | 'status_changed';
  description: string;
  timestamp: string;
  user: string;
}

export default function AgencyDashboard({ 
  userRole = 'counselor',
  userName = 'Demo User',
  agencyName = 'Demo VR Agency'
}: DashboardProps) {
  const [selectedAgency, setSelectedAgency] = useState(agencyName);
  
  // Mock data - in real app, this would come from API
  const caseStats: CaseStats = {
    open: 12,
    inProgress: 8,
    closed: 45,
    total: 65
  };

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'case_created',
      description: 'New case intake completed for Alex Johnson',
      timestamp: '2 hours ago',
      user: 'Sarah Martinez'
    },
    {
      id: '2',
      type: 'status_changed',
      description: 'Case #2023-001 moved to Employment phase',
      timestamp: '4 hours ago',
      user: 'Jordan Lee'
    },
    {
      id: '3',
      type: 'service_added',
      description: 'ASL interpreter service added to Case #2023-045',
      timestamp: '1 day ago',
      user: 'Taylor Kim'
    },
    {
      id: '4',
      type: 'case_updated',
      description: 'Progress notes updated for Jamie Chen',
      timestamp: '1 day ago',
      user: userName
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'new-case',
      label: 'New Case Intake',
      icon: <Briefcase className="w-5 h-5" aria-hidden="true" />,
      action: () => console.log('New case intake'),
      ariaLabel: 'Start new case intake'
    },
    {
      id: 'view-cases',
      label: 'View My Cases',
      icon: <Users className="w-5 h-5" aria-hidden="true" />,
      action: () => console.log('View cases'),
      ariaLabel: 'View all my assigned cases'
    },
    {
      id: 'reports',
      label: 'Generate Reports',
      icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
      action: () => console.log('Generate reports'),
      ariaLabel: 'Generate RSA-911 reports'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'case_created':
        return <Briefcase className="w-5 h-5 text-blue-600" aria-hidden="true" />;
      case 'status_changed':
        return <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />;
      case 'service_added':
        return <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />;
      case 'case_updated':
        return <Clock className="w-5 h-5 text-amber-600" aria-hidden="true" />;
    }
  };

  const getRoleDisplay = (role: UserRole): string => {
    const roleMap = {
      admin: 'Administrator',
      supervisor: 'Supervisor',
      counselor: 'Vocational Counselor',
      client: 'Client'
    };
    return roleMap[role];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header 
        className="bg-white shadow-sm border-b-2 border-fuchsia-200"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🌈 MBTQ.dev VR Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {getRoleDisplay(userRole)} • {userName}
              </p>
            </div>
            <AgencySelector 
              agencies={[
                { id: '1', name: 'Demo VR Agency', type: 'VR' },
                { id: '2', name: 'Deaf Services Center', type: 'Deaf' },
                { id: '3', name: 'Pride Employment Services', type: 'LGBTQ' }
              ]}
              selectedAgency={selectedAgency}
              onAgencyChange={setSelectedAgency}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {/* Welcome Banner */}
        <div 
          className="bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg shadow-lg p-6 mb-8 text-white"
          role="region"
          aria-label="Welcome message"
        >
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
          <p className="text-fuchsia-100">
            You have {caseStats.open} open cases and {caseStats.inProgress} cases in progress.
          </p>
        </div>

        {/* Case Statistics */}
        <section 
          className="mb-8"
          aria-labelledby="case-stats-heading"
        >
          <h2 id="case-stats-heading" className="sr-only">Case Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{caseStats.open}</p>
                </div>
                <Briefcase className="w-10 h-10 text-blue-500" aria-hidden="true" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{caseStats.inProgress}</p>
                </div>
                <Clock className="w-10 h-10 text-amber-500" aria-hidden="true" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closed Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{caseStats.closed}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" aria-hidden="true" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{caseStats.total}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Dashboard */}
        <DashboardMetrics />

        {/* Quick Actions */}
        {userRole !== 'client' && (
          <section 
            className="mb-8"
            aria-labelledby="quick-actions-heading"
          >
            <h2 id="quick-actions-heading" className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  aria-label={action.ariaLabel}
                  className="bg-white hover:bg-gray-50 rounded-lg shadow p-6 flex items-center space-x-4 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                >
                  <div className="bg-fuchsia-100 rounded-full p-3">
                    {action.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{action.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Recent Activity Feed */}
        <section 
          className="bg-white rounded-lg shadow p-6"
          aria-labelledby="activity-feed-heading"
        >
          <h2 id="activity-feed-heading" className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div 
            className="space-y-4"
            role="feed"
            aria-label="Recent case activities"
          >
            {recentActivities.map((activity) => (
              <article
                key={activity.id}
                className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} • {activity.timestamp}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Accessibility Announcement Region */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="dashboard-announcements"
      >
        Dashboard loaded with {caseStats.open} open cases
      </div>
    </div>
  );
}
