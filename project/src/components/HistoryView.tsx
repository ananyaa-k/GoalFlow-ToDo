import React, { useState } from 'react';
import { History, Calendar, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import { DayStats, LearningEntry } from '../types';
import { formatDate } from '../utils/dateUtils';

interface HistoryViewProps {
  dayStats: DayStats[];
  learningEntries: LearningEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ 
  dayStats, 
  learningEntries, 
  isOpen, 
  onClose 
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedEntry = selectedDate 
    ? learningEntries.find(entry => entry.date === selectedDate)
    : null;

  const recentStats = dayStats
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 14);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <History className="w-6 h-6 text-cyan-400 mr-2" />
              Progress History
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
                Daily Performance
              </h3>
              <div className="space-y-2">
                {recentStats.map((stat) => (
                  <div
                    key={stat.date}
                    onClick={() => setSelectedDate(stat.date)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedDate === stat.date
                        ? 'bg-cyan-900/30 border-cyan-500'
                        : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          {formatDate(new Date(stat.date))}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.todosCompleted}/{stat.totalTodos} tasks • {stat.completionRate}%
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {stat.completionRate > 0 && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {stat.hasLearningEntry && (
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Entry Detail */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 text-cyan-400 mr-2" />
                Learning Details
              </h3>
              {selectedEntry ? (
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="text-cyan-300 font-medium">
                      {formatDate(new Date(selectedEntry.date))}
                    </div>
                    <div className="text-sm text-gray-400">
                      Logged at {new Date(selectedEntry.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-gray-200 whitespace-pre-wrap">
                    {selectedEntry.content}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">
                    Select a date from the left to view learning details
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-300 text-sm font-medium">Total Active Days</div>
              <div className="text-2xl font-bold text-white">
                {dayStats.filter(s => s.completionRate > 0 || s.hasLearningEntry).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-500/30 rounded-lg p-4">
              <div className="text-blue-300 text-sm font-medium">Learning Entries</div>
              <div className="text-2xl font-bold text-white">
                {learningEntries.length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg p-4">
              <div className="text-purple-300 text-sm font-medium">Avg Completion</div>
              <div className="text-2xl font-bold text-white">
                {dayStats.length > 0 
                  ? Math.round(dayStats.reduce((sum, s) => sum + s.completionRate, 0) / dayStats.length)
                  : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;