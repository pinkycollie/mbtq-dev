# Fibonrose Example Task

This file demonstrates how to use the Fibonrose task validation system.

## Example: Create Loading Spinner Component

**Task ID**: `example-001`
**Title**: Create Loading Spinner Component
**Description**: Implement a reusable loading spinner component with TypeScript and Tailwind CSS
**Complexity Level**: 3 (requires 3 confirmations)

### 🌹 Fibonrose Confirmation Checklist

**Complexity Level:** 3
**Required Confirmations:** 3

- [ ] **Checkpoint 1:** Component created with TypeScript interfaces and props
- [ ] **Checkpoint 2:** Component styled with Tailwind CSS, responsive design verified
- [ ] **Checkpoint 3:** Component tested with unit tests and documented

### 📝 Confirmation Instructions

Each checkpoint must be confirmed with:
1. ✅ Evidence of completion (commit SHA, screenshot, test results)
2. 🔗 Link to relevant code/documentation
3. 💭 Brief explanation of what was accomplished

**Task is only complete when ALL checkpoints are confirmed.**

---

## Confirmation Examples

### Checkpoint 1 Confirmation:
```
Confirm checkpoint 1: Created LoadingSpinner.tsx at client/src/components/LoadingSpinner.tsx
with ILoadingSpinnerProps interface (size, color, className), commit abc123def456
```

### Checkpoint 2 Confirmation:
```
Confirm checkpoint 2: Styled with Tailwind CSS using animate-spin, tested responsive
behavior on mobile/tablet/desktop, screenshot at docs/examples/loading-spinner.png
```

### Checkpoint 3 Confirmation:
```
Confirm checkpoint 3: Added unit tests in LoadingSpinner.test.tsx, 100% coverage,
documented props and usage in component JSDoc comments, all tests passing
```

---

## Progress Report Example

After all confirmations:

```
📊 Fibonrose Progress Report

Task: Create Loading Spinner Component
Status: COMPLETED
Progress: 3/3 confirmations (100%)
Complexity Level: 3 (Fibonacci: 3)

Milestones:
✅ 1. Confirmation checkpoint 1/3
   Evidence: Created LoadingSpinner.tsx at client/src/components/LoadingSpinner.tsx with ILoadingSpinnerProps interface (size, color, className), commit abc123def456
✅ 2. Confirmation checkpoint 2/3
   Evidence: Styled with Tailwind CSS using animate-spin, tested responsive behavior on mobile/tablet/desktop, screenshot at docs/examples/loading-spinner.png
✅ 3. Confirmation checkpoint 3/3
   Evidence: Added unit tests in LoadingSpinner.test.tsx, 100% coverage, documented props and usage in component JSDoc comments, all tests passing

🎉 ALL CONFIRMATIONS COMPLETE!

This task has been validated through the Fibonrose sequence.
Ready to close this issue! 🚀
```

---

## How to Use This System

### For New Tasks:

1. **Assess Complexity**: Determine task complexity (0-9)
2. **Create Task**: Use `FibonroseValidator.createTask()`
3. **Generate Issue**: Use `FibonroseGitHubIntegration.generateIssueBody()`
4. **Post to GitHub**: Create issue with generated body

### During Development:

1. **Work on Checkpoints**: Complete each milestone
2. **Provide Evidence**: Comment on issue with "Confirm checkpoint X: [evidence]"
3. **Track Progress**: Monitor automated progress reports
4. **Complete Task**: All checkpoints confirmed = task complete

### Example Code:

```typescript
import { FibonroseValidator, FibonroseGitHubIntegration } from './fibonrose';

// Create a new task
const task = FibonroseValidator.createTask(
  'Create Loading Spinner Component',
  'Implement a reusable loading spinner component with TypeScript and Tailwind CSS',
  3 // Complexity level
);

// Generate GitHub issue body
const issueBody = FibonroseGitHubIntegration.generateIssueBody(task);
console.log(issueBody);

// Confirm checkpoints as you complete them
let updatedTask = FibonroseValidator.confirmMilestone(
  task,
  1,
  'Created LoadingSpinner.tsx at client/src/components/LoadingSpinner.tsx with ILoadingSpinnerProps interface, commit abc123'
);

// Check if complete
if (FibonroseValidator.isTaskComplete(updatedTask)) {
  console.log('Task fully validated! 🎉');
}
```

---

## Complexity Level Guidelines

| Complexity | Confirmations | Time Estimate | Example |
|-----------|--------------|--------------|---------|
| 0-1 | 1 | < 30 min | Fix typo, update link |
| 2 | 2 | 1-4 hours | Add component prop, update config |
| 3 | 3 | 4-8 hours | Create UI component with tests |
| 4 | 5 | 1-2 days | Implement feature with integration |
| 5 | 8 | 2-4 days | Build complete feature with docs |
| 6+ | 13+ | 1+ weeks | Major architectural changes |

---

## Benefits of Fibonrose

✅ **Prevents "90% done" syndrome** - No ambiguous completion states
✅ **Creates audit trail** - Every checkpoint has documented evidence  
✅ **Scales with complexity** - More complex tasks require more validation
✅ **Improves quality** - Forces thorough testing and documentation
✅ **Builds confidence** - Progressive confirmation reduces uncertainty
✅ **Automates tracking** - GitHub Actions handles progress updates

---

For complete documentation, see [AI Agent Guide](../docs/AI-AGENT-GUIDE.md)
