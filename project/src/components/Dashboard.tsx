import React from 'react';
import { Task, Category, DailyStats } from '../types';
import { CheckCircle, Clock, Target, TrendingUp, Calendar, Star } from 'lucide-react';
import { isToday, getStreakDays } from '../utils/dateUtils';
import { getSuggestedTasks } from '../utils/taskPriority';

interface DashboardProps {
  tasks: Task[];
  categories: Category[];
  dailyStats: DailyStats[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, categories, dailyStats }) => {
  const todaysTasks = tasks.filter(task => 
    task.dueDate && isToday(task.dueDate)
  );
  
  const completedToday = todaysTasks.filter(task => task.status === 'completed').length;
  const totalToday = todaysTasks.length;
  
  const completedDates = tasks
    .filter(task => task.status === 'completed' && task.completedAt)
    .map(task => task.completedAt!.toDateString());
  
  const currentStreak = getStreakDays(completedDates);
  const suggestedTasks = getSuggestedTasks(tasks);
  
  const overallProgress = tasks.length > 0 
    ? Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100)
    : 0;

  const motivationalQuotes = [
    "Today is a perfect day to achieve your goals!",
    "Small progress is still progress. Keep going!",
    "Your consistency is building something amazing.",
    "Focus on progress, not perfection.",
    "Every completed task brings you closer to success!"
  ];

  const todaysQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good morning! 🌅</h1>
            <p className="text-blue-100 text-lg">{todaysQuote}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{currentStreak}</div>
            <div className="text-blue-100">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today's Progress</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {completedToday}/{totalToday}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalToday > 0 ? (completedToday / totalToday) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{overallProgress}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {tasks.filter(task => task.status !== 'completed').length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Categories</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks and Suggested Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Today's Tasks
            </h2>
            <span className="text-sm text-gray-500">{todaysTasks.length} tasks</span>
          </div>
          
          <div className="space-y-3">
            {todaysTasks.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tasks scheduled for today</p>
              </div>
            ) : (
              todaysTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' : 
                    task.priority === 'urgent' ? 'bg-red-500' :
                    task.priority === 'high' ? 'bg-orange-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Suggested Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Priority Tasks
            </h2>
            <span className="text-sm text-gray-500">AI Suggested</span>
          </div>
          
          <div className="space-y-3">
            {suggestedTasks.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">All caught up! Great work!</p>
              </div>
            ) : (
              suggestedTasks.map((task, index) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{task.category}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;