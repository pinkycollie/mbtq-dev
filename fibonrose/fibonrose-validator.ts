/**
 * Fibonrose Task Validation System
 * Uses Fibonacci-inspired progression to confirm actual task completion
 */

export interface FibonroseTask {
  id: string;
  title: string;
  description: string;
  sequenceLevel: number;
  requiredConfirmations: number;
  actualConfirmations: number;
  status: 'pending' | 'in-progress' | 'confirming' | 'completed';
  milestones: FibonroseMilestone[];
  createdAt: Date;
  completedAt?: Date;
}

export interface FibonroseMilestone {
  order: number;
  description: string;
  confirmed: boolean;
  confirmedAt?: Date;
  evidence?: string; // URL, commit SHA, or proof
}

export class FibonroseValidator {
  // Fibonacci sequence for confirmation levels
  private static readonly FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

  /**
   * Calculate required confirmations based on task complexity
   * Uses Fibonacci sequence position
   */
  static getRequiredConfirmations(complexityLevel: number): number {
    const index = Math.min(complexityLevel, this.FIBONACCI.length - 1);
    return this.FIBONACCI[index];
  }

  /**
   * Create a new Fibonrose task with appropriate confirmation levels
   */
  static createTask(
    title: string,
    description: string,
    complexityLevel: number = 2
  ): FibonroseTask {
    const requiredConfirmations = this.getRequiredConfirmations(complexityLevel);
    const milestones: FibonroseMilestone[] = [];

    for (let i = 0; i < requiredConfirmations; i++) {
      milestones.push({
        order: i + 1,
        description: `Confirmation checkpoint ${i + 1}/${requiredConfirmations}`,
        confirmed: false
      });
    }

    return {
      id: crypto.randomUUID(),
      title,
      description,
      sequenceLevel: complexityLevel,
      requiredConfirmations,
      actualConfirmations: 0,
      status: 'pending',
      milestones,
      createdAt: new Date()
    };
  }

  /**
   * Confirm a milestone with evidence
   */
  static confirmMilestone(
    task: FibonroseTask,
    milestoneOrder: number,
    evidence?: string
  ): FibonroseTask {
    const milestone = task.milestones.find(m => m.order === milestoneOrder);
    
    if (!milestone) {
      throw new Error(`Milestone ${milestoneOrder} not found`);
    }

    if (milestone.confirmed) {
      throw new Error(`Milestone ${milestoneOrder} already confirmed`);
    }

    milestone.confirmed = true;
    milestone.confirmedAt = new Date();
    milestone.evidence = evidence;

    task.actualConfirmations = task.milestones.filter(m => m.confirmed).length;

    // Update task status
    if (task.actualConfirmations === 0) {
      task.status = 'pending';
    } else if (task.actualConfirmations < task.requiredConfirmations) {
      task.status = 'confirming';
    } else {
      task.status = 'completed';
      task.completedAt = new Date();
    }

    return task;
  }

  /**
   * Calculate completion percentage
   */
  static getCompletionPercentage(task: FibonroseTask): number {
    return Math.round((task.actualConfirmations / task.requiredConfirmations) * 100);
  }

  /**
   * Validate if task is truly complete
   */
  static isTaskComplete(task: FibonroseTask): boolean {
    return (
      task.actualConfirmations === task.requiredConfirmations &&
      task.milestones.every(m => m.confirmed && m.evidence)
    );
  }

  /**
   * Generate progress report
   */
  static generateProgressReport(task: FibonroseTask): string {
    const percentage = this.getCompletionPercentage(task);
    
    let report = `📊 Fibonrose Progress Report\n\n`;
    report += `Task: ${task.title}\n`;
    report += `Status: ${task.status.toUpperCase()}\n`;
    report += `Progress: ${task.actualConfirmations}/${task.requiredConfirmations} confirmations (${percentage}%)\n`;
    report += `Complexity Level: ${task.sequenceLevel} (Fibonacci: ${this.FIBONACCI[task.sequenceLevel]})\n\n`;
    
    report += `Milestones:\n`;
    task.milestones.forEach(m => {
      const status = m.confirmed ? '✅' : '⏳';
      report += `${status} ${m.order}. ${m.description}\n`;
      if (m.evidence) {
        report += `   Evidence: ${m.evidence}\n`;
      }
    });

    return report;
  }
}
