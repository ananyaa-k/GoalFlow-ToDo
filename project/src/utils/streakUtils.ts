import { DayStats, StreakData } from '../types';
import { getTodayString, getDaysAgo } from './dateUtils';

export const calculateStreak = (dayStats: DayStats[]): StreakData => {
  const today = getTodayString();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Sort by date descending
  const sortedStats = [...dayStats].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate current streak (from today backwards)
  for (let i = 0; i < sortedStats.length; i++) {
    const expectedDate = getDaysAgo(i);
    const stat = sortedStats.find(s => s.date === expectedDate);
    
    if (stat && (stat.completionRate > 0 || stat.hasLearningEntry)) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (const stat of sortedStats) {
    if (stat.completionRate > 0 || stat.hasLearningEntry) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    current: currentStreak,
    longest: longestStreak,
    lastActiveDate: today
  };
};