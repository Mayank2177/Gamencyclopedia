import React from 'react';
import { motion } from 'framer-motion';
import { GameCategory } from '../types/Game';
import { Game } from '../types/Game';

interface CategoryFilterProps {
  selectedCategory: GameCategory | 'all';
  onCategoryChange: (category: GameCategory | 'all') => void;
  games: Game[];
}

const categories = [
  { id: 'all', label: 'All Games', emoji: '🎮', color: 'from-purple-500 to-pink-500' },
  { id: 'casual', label: 'Casual', emoji: '🎯', color: 'from-green-400 to-emerald-500' },
  { id: 'arcade', label: 'Arcade', emoji: '🕹️', color: 'from-yellow-400 to-orange-500' },
  { id: 'adventure', label: 'Adventure', emoji: '🚀', color: 'from-red-400 to-pink-500' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  games,
}) => {
  const getGameCount = (categoryId: string) => {
    if (categoryId === 'all') return games.length;
    return games.filter(game => game.category === categoryId).length;
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-6 text-center font-arcade">
        GAME CATEGORIES
      </h3>
      
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const gameCount = getGameCount(category.id);
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id as GameCategory | 'all')}
              className={`relative group px-6 py-4 rounded-xl font-bold transition-all ${
                isSelected
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-arcade-blue text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.emoji}</span>
                <div className="text-left">
                  <div className="text-lg">{category.label}</div>
                  <div className="text-xs opacity-75">{gameCount} games</div>
                </div>
              </div>
              
              {/* Glow effect for selected */}
              {isSelected && (
                <motion.div
                  layoutId="categoryGlow"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} opacity-20 blur-lg`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;