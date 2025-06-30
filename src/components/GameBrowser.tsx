import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Game, GameCategory } from '../types/Game';
import GameCard from './GameCard';
import CategoryFilter from './CategoryFilter';
import StatsOverview from './StatsOverview';
import PremiumModal from './PremiumModal';
import PremiumGate from './PremiumGate';
import { useRevenueCat } from '../hooks/useRevenueCat';
import { premiumGames } from '../data/premiumGames';

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
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // In a real app, you'd get this from environment variables
  const REVENUECAT_API_KEY = 'your_revenuecat_public_api_key_here';
  
  const {
    premiumFeatures,
    subscriptionPlans,
    isLoading,
    purchasePackage,
    restorePurchases
  } = useRevenueCat(REVENUECAT_API_KEY, 'ArcadeGamer42');

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const handleGameSelect = (game: Game) => {
    const isPremiumGame = premiumGames.some(pg => pg.id === game.id);
    
    if (isPremiumGame && !premiumFeatures.isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    onGameSelect(game);
  };

  const freeGames = filteredGames.filter(game => !premiumGames.some(pg => pg.id === game.id));
  const premiumFilteredGames = filteredGames.filter(game => premiumGames.some(pg => pg.id === game.id));

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
          Dive into {games.length} wildly creative mini-games that defy logic and embrace pure fun. 
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

      {/* Free Games Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
      >
        {freeGames.map((game, index) => (
          <motion.div
            key={game.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GameCard
              game={game}
              onClick={() => handleGameSelect(game)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Premium Games Section */}
      {premiumFilteredGames.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-yellow to-neon-orange bg-clip-text text-transparent mb-4 font-arcade">
              👑 PREMIUM GAMES
            </h3>
            <p className="text-gray-300">
              Unlock exclusive games with premium features and enhanced gameplay!
            </p>
          </div>

          <PremiumGate
            isLocked={!premiumFeatures.isPremium}
            onUpgrade={() => setShowPremiumModal(true)}
            title="Premium Games Collection"
            description="Upgrade to premium to access these exclusive games"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {premiumFilteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GameCard
                    game={game}
                    onClick={() => handleGameSelect(game)}
                  />
                </motion.div>
              ))}
            </div>
          </PremiumGate>
        </motion.div>
      )}

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

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        subscriptionPlans={subscriptionPlans}
        onPurchase={purchasePackage}
        onRestore={restorePurchases}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GameBrowser;