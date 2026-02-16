/**
 * AI Job Matcher Service
 * 
 * Intelligent job matching algorithm that considers:
 * - Client skills and qualifications
 * - Accessibility requirements
 * - Deaf-friendly workplace indicators
 * - LGBTQ+ inclusive employer database integration
 */

export interface ClientProfile {
  id: string;
  skills: string[];
  qualifications: string[];
  accessibilityNeeds: {
    isDeaf?: boolean;
    isHardOfHearing?: boolean;
    requiresASLInterpreter?: boolean;
    requiresVisualAlerts?: boolean;
    assistiveTechnology?: string[];
  };
  preferences: {
    lgbtqInclusive?: boolean;
    remoteWork?: boolean;
    industry?: string[];
    location?: string;
  };
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  description: string;
  requiredSkills: string[];
  accessibility: {
    deafFriendly: boolean;
    aslInterpreterAvailable: boolean;
    visualCommunication: boolean;
    accessibleWorkplace: boolean;
  };
  inclusivity: {
    lgbtqInclusive: boolean;
    diversityPolicy: boolean;
    inclusiveHealthcare: boolean;
  };
  matchScore?: number;
}

/**
 * Calculate match score between client profile and job
 */
export function calculateMatchScore(client: ClientProfile, job: Job): number {
  let score = 0;
  let maxScore = 0;

  // Skills matching (40 points max)
  maxScore += 40;
  const matchedSkills = job.requiredSkills.filter(skill => 
    client.skills.some(clientSkill => 
      clientSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(clientSkill.toLowerCase())
    )
  );
  score += (matchedSkills.length / job.requiredSkills.length) * 40;

  // Accessibility compatibility (30 points max)
  maxScore += 30;
  if (client.accessibilityNeeds.isDeaf || client.accessibilityNeeds.isHardOfHearing) {
    if (job.accessibility.deafFriendly) score += 15;
    if (job.accessibility.visualCommunication) score += 10;
    if (client.accessibilityNeeds.requiresASLInterpreter && job.accessibility.aslInterpreterAvailable) {
      score += 5;
    }
  } else {
    score += 30; // No accessibility barriers
  }

  // Inclusivity preferences (20 points max)
  maxScore += 20;
  if (client.preferences.lgbtqInclusive && job.inclusivity.lgbtqInclusive) {
    score += 10;
  }
  if (job.inclusivity.diversityPolicy) score += 5;
  if (job.inclusivity.inclusiveHealthcare) score += 5;

  // Remote work preference (10 points max)
  maxScore += 10;
  if (client.preferences.remoteWork && job.remote) {
    score += 10;
  } else if (!client.preferences.remoteWork) {
    score += 10; // No preference, so full points
  }

  // Normalize to 0-100 scale
  return Math.round((score / maxScore) * 100);
}

/**
 * Find matching jobs for a client
 */
export async function findMatchingJobs(
  client: ClientProfile,
  availableJobs: Job[],
  minScore: number = 60
): Promise<Job[]> {
  // Calculate match scores
  const jobsWithScores = availableJobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(client, job)
  }));

  // Filter by minimum score and sort by match score
  return jobsWithScores
    .filter(job => job.matchScore! >= minScore)
    .sort((a, b) => b.matchScore! - a.matchScore!);
}

/**
 * Generate job match explanation
 */
export function generateMatchExplanation(client: ClientProfile, job: Job): string[] {
  const reasons: string[] = [];

  // Skills match
  const matchedSkills = job.requiredSkills.filter(skill => 
    client.skills.some(clientSkill => 
      clientSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  if (matchedSkills.length > 0) {
    reasons.push(`✓ Matches ${matchedSkills.length} required skills: ${matchedSkills.join(', ')}`);
  }

  // Accessibility
  if (client.accessibilityNeeds.isDeaf && job.accessibility.deafFriendly) {
    reasons.push('✓ Deaf-friendly workplace with visual communication support');
  }
  if (client.accessibilityNeeds.requiresASLInterpreter && job.accessibility.aslInterpreterAvailable) {
    reasons.push('✓ ASL interpreter services available on-site');
  }

  // Inclusivity
  if (client.preferences.lgbtqInclusive && job.inclusivity.lgbtqInclusive) {
    reasons.push('✓ LGBTQ+ inclusive employer with diversity policies');
  }
  if (job.inclusivity.inclusiveHealthcare) {
    reasons.push('✓ Inclusive healthcare benefits for LGBTQ+ employees');
  }

  // Remote work
  if (client.preferences.remoteWork && job.remote) {
    reasons.push('✓ Remote work available');
  }

  return reasons;
}

/**
 * Mock job database for demonstration
 * In production, this would integrate with real job APIs and databases
 */
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'Tech Inclusive Inc.',
    location: 'San Francisco, CA',
    remote: true,
    description: 'Full-stack developer position in inclusive tech company',
    requiredSkills: ['JavaScript', 'React', 'Node.js'],
    accessibility: {
      deafFriendly: true,
      aslInterpreterAvailable: true,
      visualCommunication: true,
      accessibleWorkplace: true
    },
    inclusivity: {
      lgbtqInclusive: true,
      diversityPolicy: true,
      inclusiveHealthcare: true
    }
  },
  {
    id: '2',
    title: 'Graphic Designer',
    company: 'Creative Minds Studio',
    location: 'New York, NY',
    remote: false,
    description: 'Visual design position for creative agency',
    requiredSkills: ['Adobe Creative Suite', 'UI/UX Design', 'Branding'],
    accessibility: {
      deafFriendly: true,
      aslInterpreterAvailable: false,
      visualCommunication: true,
      accessibleWorkplace: true
    },
    inclusivity: {
      lgbtqInclusive: true,
      diversityPolicy: true,
      inclusiveHealthcare: false
    }
  }
];
