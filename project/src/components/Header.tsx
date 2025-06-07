import React, { useState, useEffect } from 'react';
import { Shield, Zap, RefreshCw } from 'lucide-react';
import { getRandomQuote, getQuoteByCategory } from '../data/quotes';

const Header: React.FC = () => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  const refreshQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  // Add subtle animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle glow animation every 10 seconds
      const shield = document.querySelector('.shield-glow');
      if (shield) {
        shield.classList.add('animate-pulse');
        setTimeout(() => shield.classList.remove('animate-pulse'), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 border border-cyan-500/20 rounded-xl p-6 mb-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative shield-glow">
              <Shield className="w-8 h-8 text-cyan-400 drop-shadow-lg" />
              <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-mono tracking-wider">
                LLM SENTINEL
              </h1>
              <p className="text-cyan-300 text-sm font-medium">Daily Progress Tracker</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-sm font-mono">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Mission Day #{Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))}
            </div>
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/30 backdrop-blur-sm relative">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className={`text-gray-200 italic leading-relaxed transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  "{quote.text}"
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-cyan-400 text-sm font-mono">— {quote.author}</p>
                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                    {quote.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={refreshQuote}
              className="ml-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-1"
              title="Get new quote"
            >
              <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;