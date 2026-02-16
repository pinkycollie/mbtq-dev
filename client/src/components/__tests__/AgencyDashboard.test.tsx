import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgencyDashboard from '../dashboard/AgencyDashboard';

describe('AgencyDashboard Component', () => {
  it('renders dashboard with welcome message', () => {
    render(<AgencyDashboard userName="Test User" />);
    expect(screen.getByText(/welcome back, test user/i)).toBeInTheDocument();
  });

  it('displays case statistics', () => {
    render(<AgencyDashboard />);
    // Check for statistics section heading
    expect(screen.getByText(/case statistics/i)).toBeInTheDocument();
    // Check for the number "12" representing open cases
    expect(screen.getAllByText('12').length).toBeGreaterThan(0);
  });

  it('shows role-based information', () => {
    render(<AgencyDashboard userRole="counselor" userName="Jane Doe" />);
    expect(screen.getByText(/vocational counselor/i)).toBeInTheDocument();
  });

  it('renders recent activity feed', () => {
    render(<AgencyDashboard />);
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
    expect(screen.getByRole('feed')).toBeInTheDocument();
  });

  it('has accessible headings and regions', () => {
    render(<AgencyDashboard />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows quick actions for non-client roles', () => {
    render(<AgencyDashboard userRole="counselor" />);
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start new case intake/i)).toBeInTheDocument();
  });

  it('hides quick actions for client role', () => {
    render(<AgencyDashboard userRole="client" />);
    expect(screen.queryByText(/quick actions/i)).not.toBeInTheDocument();
  });

  it('is keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<AgencyDashboard userRole="counselor" />);
    
    // Tab through the component
    await user.tab();
    
    // Should be able to reach interactive elements
    const quickActionButtons = screen.getAllByRole('button');
    expect(quickActionButtons.length).toBeGreaterThan(0);
  });

  it('announces dashboard status to screen readers', () => {
    render(<AgencyDashboard />);
    const announcement = screen.getByText(/dashboard loaded with.*open cases/i);
    expect(announcement).toBeInTheDocument();
  });

  it('renders agency selector', () => {
    render(<AgencyDashboard agencyName="Test Agency" />);
    expect(screen.getByLabelText(/select agency/i)).toBeInTheDocument();
  });
});
