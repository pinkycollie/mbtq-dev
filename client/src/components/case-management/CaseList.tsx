import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  counselorName: string;
  status: 'intake' | 'assessment' | 'planning' | 'services' | 'employment' | 'follow_up' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  openedAt: string;
  lastUpdated: string;
  accessibilityNeeds?: string[];
}

interface CaseListProps {
  cases?: Case[];
  onCaseSelect?: (caseId: string) => void;
}

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'VR-2025-001',
    clientName: 'Alex Johnson',
    counselorName: 'Sarah Martinez',
    status: 'services',
    priority: 'high',
    openedAt: '2025-01-15',
    lastUpdated: '2 hours ago',
    accessibilityNeeds: ['ASL interpreter', 'Visual alerts']
  },
  {
    id: '2',
    caseNumber: 'VR-2025-002',
    clientName: 'Jordan Lee',
    counselorName: 'Taylor Kim',
    status: 'employment',
    priority: 'medium',
    openedAt: '2025-02-01',
    lastUpdated: '1 day ago',
    accessibilityNeeds: ['Screen reader', 'Caption services']
  },
  {
    id: '3',
    caseNumber: 'VR-2025-003',
    clientName: 'Jamie Chen',
    counselorName: 'Sarah Martinez',
    status: 'planning',
    priority: 'low',
    openedAt: '2025-03-10',
    lastUpdated: '3 days ago',
    accessibilityNeeds: []
  },
  {
    id: '4',
    caseNumber: 'VR-2024-089',
    clientName: 'Morgan Davis',
    counselorName: 'Jordan Lee',
    status: 'closed',
    priority: 'low',
    openedAt: '2024-11-20',
    lastUpdated: '1 week ago',
    accessibilityNeeds: ['ASL interpreter']
  }
];

export default function CaseList({ 
  cases = mockCases,
  onCaseSelect = (id) => console.log('Selected case:', id)
}: CaseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'caseNumber' | 'lastUpdated' | 'priority'>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status: Case['status']): string => {
    const colors = {
      intake: 'bg-blue-100 text-blue-800',
      assessment: 'bg-purple-100 text-purple-800',
      planning: 'bg-yellow-100 text-yellow-800',
      services: 'bg-orange-100 text-orange-800',
      employment: 'bg-green-100 text-green-800',
      follow_up: 'bg-cyan-100 text-cyan-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Case['priority']): string => {
    const colors = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-amber-100 text-amber-700',
      urgent: 'bg-red-100 text-red-700'
    };
    return colors[priority];
  };

  const getStatusIcon = (status: Case['status']): string => {
    const icons = {
      intake: '📝',
      assessment: '🔍',
      planning: '📋',
      services: '🔧',
      employment: '💼',
      follow_up: '👁️',
      closed: '✓'
    };
    return icons[status];
  };

  // Filter cases
  const filteredCases = cases.filter(c => {
    const matchesSearch = searchQuery === '' || 
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort cases
  const sortedCases = [...filteredCases].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'caseNumber') {
      comparison = a.caseNumber.localeCompare(b.caseNumber);
    } else if (sortBy === 'lastUpdated') {
      comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    } else if (sortBy === 'priority') {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginate
  const totalPages = Math.ceil(sortedCases.length / itemsPerPage);
  const paginatedCases = sortedCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Case Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          {filteredCases.length} cases found
        </p>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label htmlFor="case-search" className="sr-only">Search cases</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                id="case-search"
                type="text"
                placeholder="Search by client name or case number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="intake">Intake</option>
              <option value="assessment">Assessment</option>
              <option value="planning">Planning</option>
              <option value="services">Services</option>
              <option value="employment">Employment</option>
              <option value="follow_up">Follow Up</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label htmlFor="priority-filter" className="sr-only">Filter by priority</label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Case Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('caseNumber')}
              >
                <div className="flex items-center space-x-1">
                  <span>Case Number</span>
                  {sortBy === 'caseNumber' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Counselor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('priority')}
              >
                <div className="flex items-center space-x-1">
                  <span>Priority</span>
                  {sortBy === 'priority' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('lastUpdated')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Updated</span>
                  {sortBy === 'lastUpdated' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accessibility
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCases.map((caseItem) => (
              <tr 
                key={caseItem.id}
                onClick={() => onCaseSelect(caseItem.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCaseSelect(caseItem.id);
                  }
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{caseItem.caseNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{caseItem.clientName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{caseItem.counselorName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                    <span className="mr-1" aria-hidden="true">{getStatusIcon(caseItem.status)}</span>
                    {caseItem.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{caseItem.lastUpdated}</div>
                </td>
                <td className="px-6 py-4">
                  {caseItem.accessibilityNeeds && caseItem.accessibilityNeeds.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {caseItem.accessibilityNeeds.map((need, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-800"
                          title={need}
                        >
                          ♿
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
