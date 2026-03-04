import { Activity, AlertCircle, CheckCircle, Loader, Pause, Play } from 'lucide-react';
import { AGENT_STATES, StateSemantic, AgentState } from './types';

// Semantic mappings for sign visualization
export const STATE_SEMANTICS: Record<AgentState, StateSemantic> = {
  [AGENT_STATES.IDLE]: {
    visual: 'Ready',
    color: 'bg-gray-500',
    icon: Pause,
    motion: 'pulse-slow',
    meaning: 'System ready to receive'
  },
  [AGENT_STATES.LISTENING]: {
    visual: 'Receiving',
    color: 'bg-blue-500',
    icon: Activity,
    motion: 'pulse',
    meaning: 'Processing your intent'
  },
  [AGENT_STATES.PROCESSING]: {
    visual: 'Thinking',
    color: 'bg-purple-500',
    icon: Loader,
    motion: 'spin',
    meaning: 'Reasoning through options'
  },
  [AGENT_STATES.VALIDATING]: {
    visual: 'Checking',
    color: 'bg-yellow-500',
    icon: AlertCircle,
    motion: 'bounce',
    meaning: 'Validating constraints'
  },
  [AGENT_STATES.EXECUTING]: {
    visual: 'Acting',
    color: 'bg-orange-500',
    icon: Play,
    motion: 'pulse-fast',
    meaning: 'Executing action'
  },
  [AGENT_STATES.COMPLETED]: {
    visual: 'Done',
    color: 'bg-green-500',
    icon: CheckCircle,
    motion: 'none',
    meaning: 'Action completed'
  },
  [AGENT_STATES.ERROR]: {
    visual: 'Error',
    color: 'bg-red-500',
    icon: AlertCircle,
    motion: 'shake',
    meaning: 'Issue requires attention'
  },
  [AGENT_STATES.NEEDS_INPUT]: {
    visual: 'Waiting',
    color: 'bg-indigo-500',
    icon: Pause,
    motion: 'pulse',
    meaning: 'Your input needed'
  }
};
