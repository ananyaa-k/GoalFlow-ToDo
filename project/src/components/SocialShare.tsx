import React, { useState } from 'react';
import { Task } from '../types';
import { Share2, Twitter, Facebook, Instagram, Copy, CheckCircle } from 'lucide-react';
import { getStreakDays } from '../utils/dateUtils';

interface SocialShareProps {
  tasks: Task[];
}

const SocialShare: React.FC<SocialShareProps> = ({ tasks }) => {
  const [copied, setCopied] = useState(false);

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  
  const completedDates = completedTasks
    .filter(task => task.completedAt)
    .map(task => task.completedAt!.toDateString());
  
  const currentStreak = getStreakDays(completedDates);
  
  const todayCompleted = completedTasks.filter(task => 
    task.completedAt && 
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  ).length;

  const shareMessages = {
    achievement: `🎯 Just hit ${completionRate}% task completion rate with GoalFlow! ${currentStreak} day streak and counting! #ProductivityWin #GoalFlow`,
    daily: `✅ Completed ${todayCompleted} tasks today! Staying focused and productive with GoalFlow. ${currentStreak} day streak! #DailyProgress #Productivity`,
    streak: `🔥 ${currentStreak} day productivity streak! Consistency is key to achieving goals. #StreakGoals #ProductivityHabits #GoalFlow`,
    milestone: `🏆 Major milestone: ${completedTasks.length} tasks completed! Every small step counts towards bigger goals. #MilestoneAchieved #ProductivityJourney`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareToTwitter = (message: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = (message: string) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const generateProgressImage = () => {
    // This would generate a visual progress card
    // For now, we'll create a simple text representation
    return `
📊 My Productivity Stats:
✅ ${completedTasks.length} tasks completed
📈 ${completionRate}% completion rate
🔥 ${currentStreak} day streak
🎯 ${todayCompleted} tasks done today

Powered by GoalFlow
    `.trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Share Your Progress</h1>
        <p className="text-gray-600">Celebrate your achievements with friends and followers</p>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Your Progress</h2>
            <p className="text-blue-100">Share your productivity journey</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{completedTasks.length}</div>
              <div className="text-blue-100 text-sm">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{completionRate}%</div>
              <div className="text-blue-100 text-sm">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{currentStreak}</div>
              <div className="text-blue-100 text-sm">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{todayCompleted}</div>
              <div className="text-blue-100 text-sm">Today's Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(shareMessages).map(([type, message]) => (
          <div key={type} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 capitalize mb-1">
                  {type.replace(/([A-Z])/g, ' $1').trim()} Update
                </h3>
                <p className="text-sm text-gray-600">
                  {type === 'achievement' && 'Share your overall progress'}
                  {type === 'daily' && 'Share today\'s accomplishments'}
                  {type === 'streak' && 'Celebrate your consistency'}
                  {type === 'milestone' && 'Celebrate major achievements'}
                </p>
              </div>
              <Share2 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">{message}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => shareToTwitter(message)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => shareToFacebook(message)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => copyToClipboard(message)}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Progress Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Instagram className="w-5 h-5 mr-2 text-pink-500" />
          Visual Progress Card
        </h3>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold">My Productivity Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{completedTasks.length}</div>
                <div className="text-sm opacity-90">Tasks Completed</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{completionRate}%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{currentStreak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{todayCompleted}</div>
                <div className="text-sm opacity-90">Today</div>
              </div>
            </div>
            <div className="text-sm opacity-75">Powered by GoalFlow</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => copyToClipboard(generateProgressImage())}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Progress Stats'}</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-3">📱 Sharing Tips</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Share your daily progress to stay accountable</li>
          <li>• Celebrate milestones to maintain motivation</li>
          <li>• Use hashtags to connect with the productivity community</li>
          <li>• Tag friends to inspire them on their journey</li>
          <li>• Share visual progress cards for maximum engagement</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialShare;