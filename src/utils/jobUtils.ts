import { Job } from '../types';
import { WorkerProfile } from '../store/workerStore';

export const getRecommendedJobs = (
  jobs: Job[], 
  workerProfile: WorkerProfile | null,
  selectedArea?: string,
  selectedSubArea?: string
): Job[] => {
  if (!workerProfile) return [];

  return jobs.filter(job => {
    // Location match (highest priority)
    const locationMatch = selectedArea ? 
      job.location.toLowerCase().includes(selectedArea.toLowerCase()) : true;

    if (!locationMatch) return false;

    // Match based on skills (weighted)
    const skillMatches = job.requirements.filter(req =>
      workerProfile.skills.some(skill =>
        skill.toLowerCase().includes(req.toLowerCase())
      )
    ).length;
    
    const skillMatchScore = skillMatches / job.requirements.length;

    // Match based on work type
    const workTypeMatch = 
      workerProfile.preferredWorkType === 'both' ||
      job.workType === workerProfile.preferredWorkType;

    // Calculate overall match score
    const matchScore = (
      (skillMatchScore * 0.4) + // Skills are 40% of the score
      (workTypeMatch ? 0.2 : 0) + // Work type is 20% of the score
      (locationMatch ? 0.4 : 0) // Location is 40% of the score
    );

    // Return true if the match score is above 0.4 (40% match)
    return matchScore > 0.4;
  }).sort((a, b) => {
    // Sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};