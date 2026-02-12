import { FibonroseTask, FibonroseValidator } from './fibonrose-validator';

export class FibonroseGitHubIntegration {
  /**
   * Create GitHub issue with Fibonrose checklist
   */
  static generateIssueBody(task: FibonroseTask): string {
    let body = `## ${task.title}\n\n`;
    body += `${task.description}\n\n`;
    body += `---\n\n`;
    body += `### 🌹 Fibonrose Confirmation Checklist\n\n`;
    body += `**Complexity Level:** ${task.sequenceLevel}\n`;
    body += `**Required Confirmations:** ${task.requiredConfirmations}\n\n`;
    
    task.milestones.forEach(m => {
      body += `- [ ] **Checkpoint ${m.order}:** ${m.description}\n`;
    });

    body += `\n---\n\n`;
    body += `### 📝 Confirmation Instructions\n\n`;
    body += `Each checkpoint must be confirmed with:\n`;
    body += `1. ✅ Evidence of completion (commit SHA, screenshot, test results)\n`;
    body += `2. 🔗 Link to relevant code/documentation\n`;
    body += `3. 💭 Brief explanation of what was accomplished\n\n`;
    body += `**Task is only complete when ALL checkpoints are confirmed.**\n`;

    return body;
  }

  /**
   * Parse GitHub issue comments for confirmation evidence
   */
  static parseConfirmationComment(comment: string): {
    milestoneOrder: number | null;
    evidence: string | null;
  } {
    // Look for pattern: "Confirm checkpoint X: [evidence]"
    const confirmPattern = /confirm\s+checkpoint\s+(\d+):?\s*(.+)/i;
    const match = comment.match(confirmPattern);

    if (match) {
      return {
        milestoneOrder: parseInt(match[1], 10),
        evidence: match[2].trim()
      };
    }

    return { milestoneOrder: null, evidence: null };
  }

  /**
   * Update issue with progress
   */
  static generateProgressComment(task: FibonroseTask): string {
    const report = FibonroseValidator.generateProgressReport(task);
    const isComplete = FibonroseValidator.isTaskComplete(task);

    let comment = report + `\n\n`;

    if (isComplete) {
      comment += `🎉 **ALL CONFIRMATIONS COMPLETE!**\n\n`;
      comment += `This task has been validated through the Fibonrose sequence.\n`;
      comment += `Ready to close this issue! 🚀\n`;
    } else {
      const remaining = task.requiredConfirmations - task.actualConfirmations;
      comment += `⏳ **${remaining} confirmation(s) remaining**\n\n`;
      comment += `Next checkpoint: **${task.milestones.find(m => !m.confirmed)?.description}**\n`;
    }

    return comment;
  }
}
