import { Task } from '../types';
import { getDaysUntil, isOverdue } from './dateUtils';

export const calculateTaskPriority = (task: Task): number => {
  let score = 0;
  
  // Base priority score
  const priorityScores = {
    urgent: 100,
    high: 75,
    medium: 50,
    low: 25
  };
  score += priorityScores[task.priority];
  
  // Due date urgency
  if (task.dueDate) {
    const daysUntil = getDaysUntil(task.dueDate);
    if (isOverdue(task.dueDate)) {
      score += 50; // Overdue bonus
    } else if (daysUntil <= 1) {
      score += 30; // Due today/tomorrow
    } else if (daysUntil <= 3) {
      score += 20; // Due within 3 days
    } else if (daysUntil <= 7) {
      score += 10; // Due within a week
    }
  }
  
  // Task age (older tasks get slight priority)
  const taskAge = Math.floor((Date.now() - task.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  score += Math.min(taskAge * 2, 20);
  
  return score;
};

export const getSuggestedTasks = (tasks: Task[]): Task[] => {
  const activeTasks = tasks.filter(task => task.status !== 'completed');
  
  return activeTasks
    .map(task => ({
      ...task,
      priorityScore: calculateTaskPriority(task)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);
};