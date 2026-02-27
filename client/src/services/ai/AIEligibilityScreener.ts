/**
 * AI Eligibility Screener Service
 * 
 * Automated initial eligibility assessment for VR services
 * Generates document checklists and priority determinations
 */

export interface ClientInfo {
  hasDisability: boolean;
  disabilityDocumented: boolean;
  requiresEmploymentServices: boolean;
  isDeaf?: boolean;
  isHardOfHearing?: boolean;
  age?: number;
  hasWorkHistory?: boolean;
  educationLevel?: string;
}

export interface EligibilityResult {
  eligible: boolean;
  confidence: number; // 0-100
  reasoning: string[];
  requiredDocuments: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  nextSteps: string[];
  estimatedTimeToDecision: string;
}

/**
 * Screen client for VR eligibility
 */
export function screenEligibility(clientInfo: ClientInfo): EligibilityResult {
  const reasoning: string[] = [];
  const requiredDocuments: string[] = [];
  let eligible = true;
  let confidence = 100;
  let priority: EligibilityResult['priority'] = 'medium';

  // Basic eligibility checks
  if (!clientInfo.hasDisability) {
    eligible = false;
    confidence = 0;
    reasoning.push('❌ No documented disability');
    return {
      eligible,
      confidence,
      reasoning,
      requiredDocuments: ['Disability documentation from qualified professional'],
      priority: 'low',
      nextSteps: ['Obtain disability documentation', 'Reapply once documentation is available'],
      estimatedTimeToDecision: 'N/A - Documentation required'
    };
  }

  reasoning.push('✓ Has documented disability');

  // Check for employment services need
  if (!clientInfo.requiresEmploymentServices) {
    eligible = false;
    confidence = 0;
    reasoning.push('❌ Does not require employment services');
    return {
      eligible,
      confidence,
      reasoning,
      requiredDocuments: [],
      priority: 'low',
      nextSteps: ['Explore other service options', 'Contact if employment needs change'],
      estimatedTimeToDecision: 'N/A'
    };
  }

  reasoning.push('✓ Requires employment services');

  // Document requirements
  if (!clientInfo.disabilityDocumented) {
    requiredDocuments.push('Medical records or diagnostic reports');
    requiredDocuments.push('Functional capacity evaluation');
    confidence -= 20;
    reasoning.push('⚠ Additional documentation needed');
  } else {
    reasoning.push('✓ Disability properly documented');
  }

  // Deaf/Hard of Hearing considerations
  if (clientInfo.isDeaf || clientInfo.isHardOfHearing) {
    requiredDocuments.push('Audiogram or hearing evaluation');
    reasoning.push('✓ Deaf/Hard of Hearing - specialized services available');
    if (clientInfo.isDeaf) {
      reasoning.push('✓ ASL interpreter services can be coordinated');
    }
  }

  // Priority determination
  if (clientInfo.age && clientInfo.age < 24) {
    priority = 'high';
    reasoning.push('✓ Transition-age youth - priority population');
  }

  if (!clientInfo.hasWorkHistory) {
    priority = priority === 'high' ? 'high' : 'medium';
    reasoning.push('⚠ No work history - may need extensive services');
    requiredDocuments.push('Education transcripts');
  }

  // Additional standard documents
  requiredDocuments.push('Social Security Number or proof of work authorization');
  requiredDocuments.push('Proof of residence');
  requiredDocuments.push('Photo identification');

  // Next steps
  const nextSteps: string[] = [
    'Submit application with required documents',
    'Schedule comprehensive assessment',
    'Meet with VR counselor for intake interview',
    'Develop Individualized Plan for Employment (IPE)'
  ];

  if (clientInfo.isDeaf) {
    nextSteps.splice(1, 0, 'Request ASL interpreter for meetings');
  }

  const estimatedTimeToDecision = requiredDocuments.length <= 3 ? '7-14 days' : '14-30 days';

  return {
    eligible,
    confidence,
    reasoning,
    requiredDocuments: [...new Set(requiredDocuments)], // Remove duplicates
    priority,
    nextSteps,
    estimatedTimeToDecision
  };
}

/**
 * Generate personalized checklist for client
 */
export function generateChecklist(eligibilityResult: EligibilityResult): string {
  let checklist = '# VR Services Eligibility Checklist\n\n';
  
  checklist += `## Eligibility Status: ${eligibilityResult.eligible ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}\n`;
  checklist += `Confidence: ${eligibilityResult.confidence}%\n`;
  checklist += `Priority: ${eligibilityResult.priority.toUpperCase()}\n\n`;

  checklist += '## Required Documents:\n';
  eligibilityResult.requiredDocuments.forEach((doc, idx) => {
    checklist += `${idx + 1}. [ ] ${doc}\n`;
  });

  checklist += '\n## Next Steps:\n';
  eligibilityResult.nextSteps.forEach((step, idx) => {
    checklist += `${idx + 1}. ${step}\n`;
  });

  checklist += `\n## Estimated Time to Decision: ${eligibilityResult.estimatedTimeToDecision}\n`;

  checklist += '\n## Reasoning:\n';
  eligibilityResult.reasoning.forEach(reason => {
    checklist += `- ${reason}\n`;
  });

  return checklist;
}

/**
 * Mock screening for demonstration
 */
export const mockScreening: EligibilityResult = {
  eligible: true,
  confidence: 90,
  reasoning: [
    '✓ Has documented disability',
    '✓ Requires employment services',
    '✓ Deaf/Hard of Hearing - specialized services available',
    '✓ ASL interpreter services can be coordinated',
    '✓ Transition-age youth - priority population'
  ],
  requiredDocuments: [
    'Medical records or diagnostic reports',
    'Audiogram or hearing evaluation',
    'Education transcripts',
    'Social Security Number or proof of work authorization',
    'Proof of residence',
    'Photo identification'
  ],
  priority: 'high',
  nextSteps: [
    'Submit application with required documents',
    'Request ASL interpreter for meetings',
    'Schedule comprehensive assessment',
    'Meet with VR counselor for intake interview',
    'Develop Individualized Plan for Employment (IPE)'
  ],
  estimatedTimeToDecision: '14-30 days'
};
