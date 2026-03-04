# 🌹 Fibonrose Task Validation System

A Fibonacci-inspired task validation system that ensures work is truly complete, not just marked as "done".

## Overview

**Fibonrose** combines:
- **Fibonacci sequence** = Mathematical progression for confirmation scaling
- **Rose** = Symbol of validation/beauty in completion

## Features

- ✅ **Proportional validation**: Complex tasks require more proof points
- ✅ **Evidence-based completion**: No task is "done" without verification
- ✅ **Progressive confidence**: Each confirmation builds toward certainty
- ✅ **Prevents premature closure**: Guards against "90% done" syndrome
- ✅ **GitHub integration**: Seamless workflow with GitHub Issues

## Installation

The Fibonrose system is part of the MBTQ development platform. To use it:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Usage

### Basic Task Creation

```typescript
import { FibonroseValidator } from './fibonrose-validator';

// Create a task with complexity level 3 (requires 3 confirmations)
const task = FibonroseValidator.createTask(
  'Implement Login Feature',
  'Add user authentication with JWT',
  3
);

console.log(task);
// {
//   id: '...',
//   title: 'Implement Login Feature',
//   sequenceLevel: 3,
//   requiredConfirmations: 3,
//   status: 'pending',
//   milestones: [...]
// }
```

### Confirming Milestones

```typescript
// Confirm first checkpoint with evidence
let updatedTask = FibonroseValidator.confirmMilestone(
  task,
  1,
  'Created LoginForm component at src/components/LoginForm.tsx, commit abc123'
);

// Confirm second checkpoint
updatedTask = FibonroseValidator.confirmMilestone(
  updatedTask,
  2,
  'Added JWT authentication service, all tests passing'
);

// Check completion
if (FibonroseValidator.isTaskComplete(updatedTask)) {
  console.log('Task fully validated!');
}
```

### Generating Reports

```typescript
const report = FibonroseValidator.generateProgressReport(task);
console.log(report);
// 📊 Fibonrose Progress Report
// Task: Implement Login Feature
// Status: CONFIRMING
// Progress: 2/3 confirmations (67%)
// ...
```

### GitHub Integration

```typescript
import { FibonroseGitHubIntegration } from './fibonrose-github-integration';

// Generate GitHub issue body with checklist
const issueBody = FibonroseGitHubIntegration.generateIssueBody(task);

// Parse confirmation from issue comment
const comment = 'Confirm checkpoint 1: commit abc123';
const parsed = FibonroseGitHubIntegration.parseConfirmationComment(comment);
// { milestoneOrder: 1, evidence: 'commit abc123' }

// Generate progress comment
const progressComment = FibonroseGitHubIntegration.generateProgressComment(task);
```

## Complexity Levels

| Level | Confirmations | Example |
|-------|--------------|---------|
| 0 | 1 | Fix typo |
| 1 | 1 | Update docs |
| 2 | 2 | Add component prop |
| 3 | 3 | Create UI component |
| 4 | 5 | Implement feature with tests |
| 5 | 8 | Build complete feature |
| 6 | 13 | Major architectural change |
| 7 | 21 | Platform-wide refactor |
| 8 | 34 | Complete module rewrite |
| 9 | 55 | Full platform overhaul |

## API Reference

### FibonroseValidator

#### `getRequiredConfirmations(complexityLevel: number): number`
Calculate required confirmations based on task complexity using Fibonacci sequence.

#### `createTask(title: string, description: string, complexityLevel?: number): FibonroseTask`
Create a new Fibonrose task with appropriate confirmation levels.

#### `confirmMilestone(task: FibonroseTask, milestoneOrder: number, evidence?: string): FibonroseTask`
Confirm a milestone with evidence. Returns updated task.

#### `getCompletionPercentage(task: FibonroseTask): number`
Calculate completion percentage (0-100).

#### `isTaskComplete(task: FibonroseTask): boolean`
Validate if task is truly complete (all milestones confirmed with evidence).

#### `generateProgressReport(task: FibonroseTask): string`
Generate a formatted progress report.

### FibonroseGitHubIntegration

#### `generateIssueBody(task: FibonroseTask): string`
Generate GitHub issue body with Fibonrose checklist.

#### `parseConfirmationComment(comment: string): { milestoneOrder: number | null, evidence: string | null }`
Parse GitHub issue comments for confirmation evidence.

#### `generateProgressComment(task: FibonroseTask): string`
Generate progress comment for GitHub issues.

## Testing

The Fibonrose system includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Integration with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/fibonrose-validator.yml`) that automatically:
- Monitors issue comments for Fibonrose confirmations
- Updates task progress
- Generates progress reports
- Notifies when tasks are fully validated

## Best Practices

1. **Be honest about complexity** - Don't underestimate task difficulty
2. **Provide quality evidence** - Include commit SHAs, screenshots, test results
3. **Confirm promptly** - Don't wait until all work is done
4. **Communicate blockers** - Ask for help if stuck on a checkpoint

## License

MIT License - Part of the MBTQ Development Platform
