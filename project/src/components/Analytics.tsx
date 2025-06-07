import React from 'react';
import { Task, Category } from '../types';
import { BarChart3, TrendingUp, Calendar, Target, Award, Clock } from 'lucide-react';
import { formatDate, getStreakDays } from '../utils/dateUtils';

interface AnalyticsProps {
  tasks: Task[];
  categories: Category[];
}

const Analytics: React.FC<AnalyticsProps> = ({ tasks, categories }) => {
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const completedDates = completedTasks
    .filter(task => task.completedAt)
    .map(task => task.completedAt!.toDateString());
  
  const currentStreak = getStreakDays(completedDates);
  
  // Category statistics
  const categoryStats = categories.map(category => {
    const categoryTasks = tasks.filter(task => task.category === category.name);
    const completedCategoryTasks = categoryTasks.filter(task => task.status === 'completed');
    
    return {
      ...category,
      totalTasks: categoryTasks.length,
      completedTasks: completedCategoryTasks.length,
      completionRate: categoryTasks.length > 0 ? Math.round((completedCategoryTasks.length / categoryTasks.length) * 100) : 0
    };
  });

  // Priority distribution
  const priorityStats = {
    urgent: tasks.filter(task => task.priority === 'urgent').length,
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  };

  // Weekly completion trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toDateString();
  }).reverse();

  const weeklyCompletions = last7Days.map(date => {
    const count = completedTasks.filter(task => 
      task.completedAt && task.completedAt.toDateString() === date
    ).length;
    return { date, count };
  });

  const maxWeeklyCount = Math.max(...weeklyCompletions.map(d => d.count), 1);

  // Average completion time
  const tasksWithDuration = completedTasks.filter(task => 
    task.completedAt && task.createdAt
  );
  
  const avgCompletionDays = tasksWithDuration.length > 0
    ? Math.round(
        tasksWithDuration.reduce((sum, task) => {
          const duration = (task.completedAt!.getTime() - task.createdAt.getTime()) / (1000 * 60 * 60 * 24);
          return sum + duration;
        }, 0) / tasksWithDuration.length
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600">Track your productivity and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Completion Rate</p>
              <p className="text-3xl font-bold mt-1">{completionRate}%</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold mt-1">{currentStreak}</p>
              <p className="text-green-100 text-xs">days</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold mt-1">{totalTasks}</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg. Completion</p>
              <p className="text-3xl font-bold mt-1">{avgCompletionDays}</p>
              <p className="text-orange-100 text-xs">days</p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 p-3 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Completion Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Weekly Completion Trend
          </h3>
          <div className="space-y-4">
            {weeklyCompletions.map((day, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(day.count / maxWeeklyCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-sm text-gray-800 font-medium">
                  {day.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
            Priority Distribution
          </h3>
          <div className="space-y-4">
            {Object.entries(priorityStats).map(([priority, count]) => {
              const percentage = totalTasks > 0 ? (count / totalTasks) * 100 : 0;
              const colors = {
                urgent: 'from-red-500 to-red-600',
                high: 'from-orange-500 to-orange-600',
                medium: 'from-blue-500 to-blue-600',
                low: 'from-gray-500 to-gray-600'
              };
              
              return (
                <div key={priority} className="flex items-center space-x-3">
                  <div className="w-16 text-sm text-gray-600 capitalize">
                    {priority}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${colors[priority as keyof typeof colors]} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-sm text-gray-800 font-medium">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-500" />
          Category Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Tasks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Completed</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Completion Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{category.totalTasks}</td>
                  <td className="py-4 px-4 text-gray-600">{category.completedTasks}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      category.completionRate >= 80 ? 'bg-green-100 text-green-800' :
                      category.completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {category.completionRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.completionRate}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;