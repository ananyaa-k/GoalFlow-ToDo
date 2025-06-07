export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  lastUpdated: Date;
}

export interface LearningEntry {
  id: string;
  content: string;
  timestamp: Date;
  date: string;
}

export interface DayStats {
  date: string;
  todosCompleted: number;
  totalTodos: number;
  hasLearningEntry: boolean;
  completionRate: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string;
}

export interface Quote {
  text: string;
  author: string;
  category: string;
}