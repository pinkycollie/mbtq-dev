import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignerPanel } from '../SignVisualSystem/SignerPanel';
import { ConfidenceCue } from '../SignVisualSystem/ConfidenceCue';
import { ActionLog } from '../SignVisualSystem/ActionLog';
import { AGENT_STATES } from '../SignVisualSystem/types';
import type { AgentStateData, AgentStateEvent } from '../SignVisualSystem/types';

describe('SignerPanel Component', () => {
  const mockState: AgentStateData = {
    current: AGENT_STATES.IDLE,
    actor: 'TestAgent',
    confidence: 0.85,
    requiresUser: false
  };

  it('renders with default props', () => {
    render(<SignerPanel state={mockState} />);
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.getByText('System ready to receive')).toBeInTheDocument();
  });

  it('displays agent actor when provided', () => {
    render(<SignerPanel state={mockState} />);
    expect(screen.getByText('Agent: TestAgent')).toBeInTheDocument();
  });

  it('displays confidence indicator', () => {
    render(<SignerPanel state={mockState} />);
    expect(screen.getByText('Confidence: 85%')).toBeInTheDocument();
  });

  it('shows action required when requiresUser is true', () => {
    const stateWithUserAction: AgentStateData = {
      ...mockState,
      requiresUser: true
    };
    render(<SignerPanel state={stateWithUserAction} />);
    expect(screen.getByText('⚠ Action Required')).toBeInTheDocument();
  });

  it('renders different states correctly', () => {
    const { rerender } = render(<SignerPanel state={mockState} />);
    expect(screen.getByText('Ready')).toBeInTheDocument();

    rerender(<SignerPanel state={{ ...mockState, current: AGENT_STATES.PROCESSING }} />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
    expect(screen.getByText('Reasoning through options')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { container } = render(<SignerPanel state={mockState} size="small" />);
    const panel = container.querySelector('.w-48.h-48');
    expect(panel).toBeInTheDocument();
  });

  it('applies correct position classes', () => {
    const { container } = render(<SignerPanel state={mockState} position="left" />);
    const panel = container.querySelector('.left-4');
    expect(panel).toBeInTheDocument();
  });
});

describe('ConfidenceCue Component', () => {
  it('renders confidence bar', () => {
    render(<ConfidenceCue confidence={0.75} />);
    expect(screen.getByText('Certainty:')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('displays high confidence with green color', () => {
    const { container } = render(<ConfidenceCue confidence={0.9} />);
    const bar = container.querySelector('.bg-green-500');
    expect(bar).toBeInTheDocument();
  });

  it('displays medium confidence with yellow color', () => {
    const { container } = render(<ConfidenceCue confidence={0.6} />);
    const bar = container.querySelector('.bg-yellow-500');
    expect(bar).toBeInTheDocument();
  });

  it('displays low confidence with red color', () => {
    const { container } = render(<ConfidenceCue confidence={0.3} />);
    const bar = container.querySelector('.bg-red-500');
    expect(bar).toBeInTheDocument();
  });
});

describe('ActionLog Component', () => {
  const mockEvents: AgentStateEvent[] = [
    {
      current: AGENT_STATES.LISTENING,
      actor: 'Agent1',
      confidence: 1.0,
      requiresUser: false,
      timestamp: Date.now()
    },
    {
      current: AGENT_STATES.PROCESSING,
      actor: 'Agent2',
      confidence: 0.85,
      requiresUser: false,
      timestamp: Date.now()
    }
  ];

  it('renders activity log header', () => {
    render(<ActionLog events={mockEvents} />);
    expect(screen.getByText('Agent Activity')).toBeInTheDocument();
  });

  it('displays all events', () => {
    render(<ActionLog events={mockEvents} />);
    expect(screen.getByText('Receiving')).toBeInTheDocument();
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });

  it('shows agent names in events', () => {
    render(<ActionLog events={mockEvents} />);
    expect(screen.getByText('(Agent1)')).toBeInTheDocument();
    expect(screen.getByText('(Agent2)')).toBeInTheDocument();
  });

  it('displays semantic meanings', () => {
    render(<ActionLog events={mockEvents} />);
    expect(screen.getByText('Processing your intent')).toBeInTheDocument();
    expect(screen.getByText('Reasoning through options')).toBeInTheDocument();
  });

  it('handles empty events array', () => {
    render(<ActionLog events={[]} />);
    expect(screen.getByText('Agent Activity')).toBeInTheDocument();
  });
});
