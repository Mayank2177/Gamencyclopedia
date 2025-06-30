import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, User, Home, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentView: 'browser' | 'game' | 'profile';
  onNavigate: (view: 'browser' | 'game' | 'profile') => void;
  onBackClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onBackClick }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative bg-gradient-to-r from-arcade-dark to-arcade-blue border-b-2 border-neon-cyan shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button or Logo */}
          <div className="flex items-center space-x-4">
            {currentView !== 'browser' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBackClick}
                className="p-2 rounded-lg bg-neon-cyan text-arcade-dark hover:bg-neon-yellow transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
            
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Gamepad2 className="w-8 h-8 text-neon-pink animate-pulse-slow" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent font-arcade">
                WACKY WORLD ARCADE
              </h1>
            </motion.div>
          </div>

          {/* Center - Game count indicator */}
          <div className="hidden md:flex items-center space-x-2 text-neon-green font-arcade">
            <span className="text-sm opacity-75">15 INSANE GAMES</span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('browser')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'browser'
                  ? 'bg-neon-cyan text-arcade-dark'
                  : 'text-neon-cyan hover:bg-neon-cyan hover:text-arcade-dark'
              }`}
            >
              <Home size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('profile')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'profile'
                  ? 'bg-neon-pink text-arcade-dark'
                  : 'text-neon-pink hover:bg-neon-pink hover:text-arcade-dark'
              }`}
            >
              <User size={20} />
            </motion.button>

            <div className="hidden sm:block text-right">
              <div className="text-xs text-neon-yellow font-arcade">REDDIT USER</div>
              <div className="text-sm text-white font-bold">ArcadeGamer42</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green animate-pulse"></div>
    </motion.header>
  );
};

export default Header;
