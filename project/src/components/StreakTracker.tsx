import React from 'react';
import { Flame, Trophy, Target } from 'lucide-react';
import { StreakData } from '../types';

interface StreakTrackerProps {
  streakData: StreakData;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streakData }) => {
  const isNewRecord = streakData.current === streakData.longest && streakData.current > 0;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Flame className="w-5 h-5 text-orange-400 mr-2" />
        Consistency Tracker
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-white mt-1">{streakData.current}</p>
              <p className="text-orange-200 text-xs">days</p>
            </div>
            <Flame className="w-8 h-8 text-orange-400" />
          </div>
          {isNewRecord && streakData.current > 1 && (
            <div className="mt-2 text-xs text-yellow-300 font-medium">
              🎉 New Personal Record!
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Longest Streak</p>
              <p className="text-3xl font-bold text-white mt-1">{streakData.longest}</p>
              <p className="text-purple-200 text-xs">days</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-300 text-sm font-medium">Today's Target</p>
              <p className="text-lg font-semibold text-white mt-1">Stay Active</p>
              <p className="text-cyan-200 text-xs">Complete tasks & log learnings</p>
            </div>
            <Target className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;