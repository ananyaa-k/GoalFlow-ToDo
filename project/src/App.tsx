import React, { useState, useEffect } from 'react';
import { Todo, Goal, LearningEntry, DayStats, StreakData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getTodayString, isToday } from './utils/dateUtils';
import { calculateStreak } from './utils/streakUtils';
import Header from './components/Header';
import StreakTracker from './components/StreakTracker';
import TodoSection from './components/TodoSection';
import GoalsSection from './components/GoalsSection';
import LearningLog from './components/LearningLog';
import HistoryView from './components/HistoryView';
import { History } from 'lucide-react';

function App() {
  // Local storage hooks
  const [todos, setTodos] = useLocalStorage<Todo[]>('llm-sentinel-todos', []);
  const [goals, setGoals] = useLocalStorage<Goal[]>('llm-sentinel-goals', [
    {
      id: '1',
      title: 'Learn OpenAI Security landscape deeply',
      progress: 0,
      lastUpdated: new Date()
    },
    {
      id: '2',
      title: 'Build and ship 1 OpenAI Security tool in 3–6 months',
      progress: 0,
      lastUpdated: new Date()
    },
    {
      id: '3',
      title: 'Publish 1 blog post / technical writeup per month',
      progress: 0,
      lastUpdated: new Date()
    },
    {
      id: '4',
      title: 'Contribute to one open-source LLM Security repo',
      progress: 0,
      lastUpdated: new Date()
    },
    {
      id: '5',
      title: 'Build network in OpenAI Security field',
      progress: 0,
      lastUpdated: new Date()
    }
  ]);
  const [learningEntries, setLearningEntries] = useLocalStorage<LearningEntry[]>('llm-sentinel-learning', []);
  const [dayStats, setDayStats] = useLocalStorage<DayStats[]>('llm-sentinel-stats', []);

  const [historyOpen, setHistoryOpen] = useState(false);

  // Filter today's todos
  const todaysTodos = todos.filter(todo => isToday(todo.createdAt));
  const todaysLearning = learningEntries.find(entry => entry.date === getTodayString());

  // Calculate streak data
  const streakData: StreakData = calculateStreak(dayStats);

  // Archive old todos and update stats
  useEffect(() => {
    const today = getTodayString();
    
    // Archive todos older than today
    const activeTodos = todos.filter(todo => isToday(todo.createdAt));
    if (activeTodos.length !== todos.length) {
      setTodos(activeTodos);
    }

    // Update today's stats
    const todayCompleted = todaysTodos.filter(todo => todo.completed).length;
    const todayTotal = todaysTodos.length;
    const hasLearning = !!todaysLearning?.content.trim();
    
    const existingStatIndex = dayStats.findIndex(stat => stat.date === today);
    const newStat: DayStats = {
      date: today,
      todosCompleted: todayCompleted,
      totalTodos: todayTotal,
      hasLearningEntry: hasLearning,
      completionRate: todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0
    };

    if (existingStatIndex >= 0) {
      const updatedStats = [...dayStats];
      updatedStats[existingStatIndex] = newStat;
      setDayStats(updatedStats);
    } else if (todayTotal > 0 || hasLearning) {
      setDayStats(prev => [...prev, newStat]);
    }
  }, [todos, todaysTodos, todaysLearning, dayStats, setTodos, setDayStats]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleUpdateGoal = (id: string, progress: number) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, progress, lastUpdated: new Date() } : goal
    ));
  };

  const handleSaveLearning = (content: string) => {
    const today = getTodayString();
    const existingEntryIndex = learningEntries.findIndex(entry => entry.date === today);
    
    const newEntry: LearningEntry = {
      id: today,
      content,
      timestamp: new Date(),
      date: today
    };

    if (existingEntryIndex >= 0) {
      const updatedEntries = [...learningEntries];
      updatedEntries[existingEntryIndex] = newEntry;
      setLearningEntries(updatedEntries);
    } else {
      setLearningEntries(prev => [...prev, newEntry]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Header />
        
        <StreakTracker streakData={streakData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TodoSection
              todos={todaysTodos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
            
            <LearningLog
              todaysEntry={todaysLearning || null}
              onSaveEntry={handleSaveLearning}
            />
          </div>
          
          <div>
            <GoalsSection
              goals={goals}
              onUpdateGoal={handleUpdateGoal}
            />
          </div>
        </div>

        {/* History Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setHistoryOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <History className="w-5 h-5" />
            <span>View History & Reflection</span>
          </button>
        </div>

        <HistoryView
          dayStats={dayStats}
          learningEntries={learningEntries}
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;