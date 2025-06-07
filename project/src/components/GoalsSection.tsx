import React, { useState } from 'react';
import { Target, Edit3, Save, X } from 'lucide-react';
import { Goal } from '../types';

interface GoalsSectionProps {
  goals: Goal[];
  onUpdateGoal: (id: string, progress: number) => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, onUpdateGoal }) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editProgress, setEditProgress] = useState<number>(0);

  const handleEditStart = (goal: Goal) => {
    setEditingGoal(goal.id);
    setEditProgress(goal.progress);
  };

  const handleEditSave = (goalId: string) => {
    onUpdateGoal(goalId, editProgress);
    setEditingGoal(null);
  };

  const handleEditCancel = () => {
    setEditingGoal(null);
    setEditProgress(0);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 text-cyan-400 mr-2" />
        Core Security Goals
      </h2>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">{goal.title}</h3>
              <div className="flex items-center space-x-2">
                {editingGoal === goal.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(goal.id)}
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditStart(goal)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {editingGoal === goal.id ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editProgress}
                  onChange={(e) => setEditProgress(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">0%</span>
                  <span className="text-cyan-400 font-mono">{editProgress}%</span>
                  <span className="text-gray-400">100%</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm text-cyan-400 font-mono">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">
                  Last updated: {goal.lastUpdated.toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsSection;