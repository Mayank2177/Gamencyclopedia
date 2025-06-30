import React from 'react';
import { motion } from 'framer-motion';
import { Game, GameCategory } from '../types/Game';
import GameCard from './GameCard';
import CategoryFilter from './CategoryFilter';
import StatsOverview from './StatsOverview';

interface GameBrowserProps {
  games: Game[];
  selectedCategory: GameCategory | 'all';
  onCategoryChange: (category: GameCategory | 'all') => void;
  onGameSelect: (game: Game) => void;
}

const GameBrowser: React.FC<GameBrowserProps> = ({
  games,
  selectedCategory,
  onCategoryChange,
  onGameSelect,
}) => {
  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text text-transparent mb-4 font-arcade">
          CHOOSE YOUR CHAOS
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Dive into 15 wildly creative mini-games that defy logic and embrace pure fun. 
          From defending donuts to racing snails, your next adventure awaits!
        </p>
      </motion.div>

      {/* Stats Overview */}
      <StatsOverview games={games} />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        games={games}
      />

      {/* Games Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GameCard
              game={game}
              onClick={() => onGameSelect(game)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-neon-purple/30">
          <h3 className="text-2xl font-bold text-neon-purple mb-4 font-arcade">
            🚀 MORE CHAOS INCOMING
          </h3>
          <p className="text-gray-300 mb-6">
            We're cooking up even more insane games! Join our Reddit community to vote on what gets built next.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-neon-orange to-neon-pink text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-neon-pink/25 transition-all"
          >
            Join r/WackyWorldArcade
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameBrowser;