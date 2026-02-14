import { useState } from 'react';
import { Building2, ChevronDown } from 'lucide-react';

export interface Agency {
  id: string;
  name: string;
  type: 'VR' | 'LGBTQ' | 'Deaf' | 'Multi';
}

interface AgencySelectorProps {
  agencies: Agency[];
  selectedAgency: string;
  onAgencyChange: (agencyName: string) => void;
}

export default function AgencySelector({ 
  agencies, 
  selectedAgency, 
  onAgencyChange 
}: AgencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getAgencyTypeIcon = (type: Agency['type']): string => {
    const icons = {
      VR: '♿',
      LGBTQ: '🏳️‍🌈',
      Deaf: '🤟',
      Multi: '🌈'
    };
    return icons[type];
  };

  const getAgencyTypeColor = (type: Agency['type']): string => {
    const colors = {
      VR: 'bg-blue-100 text-blue-800',
      LGBTQ: 'bg-pink-100 text-pink-800',
      Deaf: 'bg-purple-100 text-purple-800',
      Multi: 'bg-gradient-to-r from-pink-100 to-blue-100 text-gray-800'
    };
    return colors[type];
  };

  const handleKeyDown = (e: React.KeyboardEvent, agency: Agency) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAgencyChange(agency.name);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center space-x-2 bg-white border-2 border-gray-200 rounded-lg px-4 py-2 hover:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select agency"
      >
        <Building2 className="w-5 h-5 text-gray-600" aria-hidden="true" />
        <span className="font-medium text-gray-900">{selectedAgency}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          role="listbox"
          aria-label="Available agencies"
        >
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
              Select Agency
            </div>
            {agencies.map((agency) => (
              <div
                key={agency.id}
                role="option"
                aria-selected={agency.name === selectedAgency}
                tabIndex={0}
                onClick={() => {
                  onAgencyChange(agency.name);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, agency)}
                className={`
                  px-3 py-3 rounded-md cursor-pointer
                  hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                  transition-colors
                  ${agency.name === selectedAgency ? 'bg-fuchsia-50' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl" aria-hidden="true">
                      {getAgencyTypeIcon(agency.type)}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {agency.name}
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getAgencyTypeColor(agency.type)}`}>
                        {agency.type} Agency
                      </div>
                    </div>
                  </div>
                  {agency.name === selectedAgency && (
                    <span className="text-fuchsia-600" aria-label="Currently selected">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-600">
              💡 Multi-agency access: Switch between agencies you have access to
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
