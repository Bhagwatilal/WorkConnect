import { Job } from '../types';
import { WorkerProfile } from '../store/workerStore';

export const getRecommendedJobs = (jobs: Job[], workerProfile: WorkerProfile | null): Job[] => {
  if (!workerProfile) return [];

  return jobs.filter(job => {
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

    // Match based on location (if available)
    const locationMatch = job.location.toLowerCase() === workerProfile.address.toLowerCase();

    // Calculate overall match score
    const matchScore = (
      (skillMatchScore * 0.5) + // Skills are 50% of the score
      (workTypeMatch ? 0.3 : 0) + // Work type is 30% of the score
      (locationMatch ? 0.2 : 0) // Location is 20% of the score
    );

    // Return true if the match score is above 0.4 (40% match)
    return matchScore > 0.4;
  }).sort((a, b) => {
    // Sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};