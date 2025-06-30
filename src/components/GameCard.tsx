import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Clock, Zap } from 'lucide-react';
import { Game } from '../types/Game';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const complexityColors = {
  low: 'from-green-400 to-emerald-500',
  medium: 'from-yellow-400 to-orange-500',
  high: 'from-red-400 to-pink-500'
};

const complexityLabels = {
  low: 'Casual',
  medium: 'Arcade',
  high: 'Adventure'
};

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const difficultyStars = '★'.repeat(game.difficulty) + '☆'.repeat(5 - game.difficulty);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative bg-gradient-to-br from-arcade-blue to-arcade-purple rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-neon-cyan/25 transition-all duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`text-4xl bg-gradient-to-r ${game.color} bg-clip-text`}>
              {game.icon}
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${complexityColors[game.complexity]} text-white`}>
                {complexityLabels[game.complexity]}
              </span>
              {!game.isPlayable && (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
            {game.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {game.description}
          </p>

          {/* Game Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{game.estimatedPlayTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Zap className="w-3 h-3" />
              <span>{difficultyStars}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {game.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              game.isPlayable
                ? `bg-gradient-to-r ${game.color} hover:shadow-lg hover:shadow-neon-cyan/25`
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!game.isPlayable}
          >
            <div className="flex items-center justify-center space-x-2">
              {game.isPlayable ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>PLAY NOW</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>COMING SOON</span>
                </>
              )}
            </div>
          </motion.button>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 bg-gradient-to-r ${game.color} opacity-10 rounded-xl`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;