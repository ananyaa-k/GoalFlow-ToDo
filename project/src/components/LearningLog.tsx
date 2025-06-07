import React, { useState } from 'react';
import { BookOpen, Save, Clock, Lightbulb, Target, HelpCircle } from 'lucide-react';
import { LearningEntry } from '../types';
import { formatTime } from '../utils/dateUtils';

interface LearningLogProps {
  todaysEntry: LearningEntry | null;
  onSaveEntry: (content: string) => void;
}

const LearningLog: React.FC<LearningLogProps> = ({ todaysEntry, onSaveEntry }) => {
  const [content, setContent] = useState(todaysEntry?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

  const learningTemplate = `🗓️ Date: ${new Date().toLocaleDateString()}

🔍 Focus Area(s) Today:
(e.g. Prompt Injection, Model Extraction, LLM Defense Architecture)

📚 Papers / Blogs / Resources Explored:
• [Title / link]
• [Title / link]

🛠️ Tools / Code Explored:
• [Repo link or name]
• [Observations / what worked / what failed]

🧠 Key Learnings & Insights:
(Write at least 3 bullet points — force yourself to reflect)
• 
• 
• 

⚡ Questions or Confusions:
(Capture these — they drive learning!)
• 
• 

✅ Next Action(s) Based on Today:
(What will you do tomorrow to build on today?)
• 
• `;

  const handleSave = async () => {
    setIsSaving(true);
    onSaveEntry(content);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleUseTemplate = () => {
    setContent(learningTemplate);
    setShowTemplate(false);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <BookOpen className="w-5 h-5 text-cyan-400 mr-2" />
            Today's Key Learnings
            <div className="ml-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </h2>
          {todaysEntry && (
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              Last saved: {formatTime(todaysEntry.timestamp)}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Document your AI Security learning journey..."
              className="w-full h-48 bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none backdrop-blur-sm"
            />
            
            {/* Template button overlay */}
            {content.length === 0 && (
              <button
                onClick={() => setShowTemplate(!showTemplate)}
                className="absolute top-3 right-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded-md text-sm transition-all duration-200 flex items-center space-x-1"
              >
                <Target className="w-3 h-3" />
                <span>Use Template</span>
              </button>
            )}
          </div>

          {/* Template preview */}
          {showTemplate && (
            <div className="bg-gray-700/50 border border-cyan-500/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-cyan-300 font-medium flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Learning Log Template
                </h4>
                <button
                  onClick={() => setShowTemplate(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-gray-800/50 p-3 rounded border border-gray-600 max-h-32 overflow-y-auto">
                {learningTemplate}
              </pre>
              <button
                onClick={handleUseTemplate}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                Use This Template
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400 flex items-center space-x-4">
              <span>Auto-saves with timestamp</span>
              <span>•</span>
              <span className="font-mono">{content.length} chars</span>
              {content.length > 100 && (
                <span className="text-green-400 flex items-center">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Good progress!
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Entry'}</span>
            </button>
          </div>
        </div>

        {/* Enhanced learning tips */}
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded-lg border border-gray-600 backdrop-blur-sm">
          <h4 className="text-sm font-medium text-cyan-300 mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Security Learning Tips:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Document specific attack vectors discovered</li>
              <li>• Note defense mechanisms and their effectiveness</li>
              <li>• Track LLM behavior patterns and anomalies</li>
            </ul>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Record breakthrough moments and insights</li>
              <li>• Connect findings to broader security principles</li>
              <li>• Plan next experiments based on today's work</li>
            </ul>
          </div>
        </div>

        {/* Progress indicator */}
        {content.length > 0 && (
          <div className="mt-3 flex items-center space-x-2">
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((content.length / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">
              {content.length < 100 ? 'Getting started...' :
               content.length < 300 ? 'Good detail!' :
               content.length < 500 ? 'Excellent depth!' :
               'Comprehensive entry! 🎯'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningLog;