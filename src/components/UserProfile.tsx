import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Target, Edit as Reddit, Crown, Settings } from 'lucide-react';
import { useRevenueCat } from '../hooks/useRevenueCat';
import PremiumModal from './PremiumModal';
import PremiumBadge from './PremiumBadge';

const UserProfile: React.FC = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // In a real app, you'd get this from environment variables
  const REVENUECAT_API_KEY = 'your_revenuecat_public_api_key_here';
  
  const {
    premiumFeatures,
    subscriptionPlans,
    isLoading,
    error,
    purchasePackage,
    restorePurchases
  } = useRevenueCat(REVENUECAT_API_KEY, 'ArcadeGamer42');

  const userStats = {
    level: 12,
    totalScore: 45380,
    gamesPlayed: premiumFeatures.isPremium ? 13 : 8,
    achievements: premiumFeatures.isPremium ? 22 : 15,
    timePlayedHours: 23,
    favoriteGame: 'Chicken Nugget Chaos',
    redditKarma: 1247,
  };

  const recentAchievements = [
    { id: 1, name: 'Nugget Master', description: 'Collected 1000 nuggets', icon: '🍗', earned: '2 days ago' },
    { id: 2, name: 'Bubble Buster', description: 'Popped 500 bubbles', icon: '🫧', earned: '1 week ago' },
    { id: 3, name: 'Speed Demon', description: 'Won a snail race in under 5 minutes', icon: '🐌', earned: '2 weeks ago' },
    ...(premiumFeatures.isPremium ? [
      { id: 4, name: 'Quantum Explorer', description: 'Completed Quantum Cat Simulator', icon: '🐱', earned: '3 days ago', premium: true },
      { id: 5, name: 'Pizza Master', description: 'Delivered 100 interdimensional pizzas', icon: '🍕', earned: '1 week ago', premium: true },
    ] : [])
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-arcade-blue to-arcade-purple rounded-xl p-8 border border-gray-600 mb-8"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full flex items-center justify-center text-4xl font-bold text-white">
              AG
            </div>
            {premiumFeatures.isPremium && (
              <Crown className="absolute -top-2 -right-2 w-8 h-8 text-neon-yellow animate-pulse" />
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-white font-arcade">ArcadeGamer42</h1>
              <PremiumBadge isPremium={premiumFeatures.isPremium} size="sm" />
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Reddit className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400">u/ArcadeGamer42</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{userStats.redditKarma} karma</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-cyan font-arcade">
                  {userStats.level}
                </div>
                <div className="text-xs text-gray-400">LEVEL</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-yellow font-arcade">
                  {userStats.totalScore.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">TOTAL SCORE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green font-arcade">
                  {userStats.achievements}
                </div>
                <div className="text-xs text-gray-400">ACHIEVEMENTS</div>
              </div>
            </div>
          </div>

          {!premiumFeatures.isPremium && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPremiumModal(true)}
              className="bg-gradient-to-r from-neon-orange to-neon-pink text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-neon-pink/25 transition-all"
            >
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Upgrade to Premium</span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Premium Features Status */}
        {premiumFeatures.isPremium && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-neon-yellow/20 to-neon-orange/20 border border-neon-yellow/30 rounded-lg p-4 mb-8"
          >
            <h3 className="text-lg font-bold text-neon-yellow mb-2 font-arcade flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>PREMIUM ACTIVE</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className={premiumFeatures.hasAdFree ? 'text-neon-green' : 'text-gray-400'}>
                  {premiumFeatures.hasAdFree ? '✓' : '✗'} Ad-Free
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={premiumFeatures.hasExclusiveGames ? 'text-neon-green' : 'text-gray-400'}>
                  {premiumFeatures.hasExclusiveGames ? '✓' : '✗'} Exclusive Games
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={premiumFeatures.hasUnlimitedLives ? 'text-neon-green' : 'text-gray-400'}>
                  {premiumFeatures.hasUnlimitedLives ? '✓' : '✗'} Unlimited Lives
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={premiumFeatures.hasCustomThemes ? 'text-neon-green' : 'text-gray-400'}>
                  {premiumFeatures.hasCustomThemes ? '✓' : '✗'} Custom Themes
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <Target className="w-8 h-8 text-neon-pink mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{userStats.gamesPlayed}</div>
            <div className="text-xs text-gray-400">Games Played</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{userStats.timePlayedHours}h</div>
            <div className="text-xs text-gray-400">Time Played</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
            <div className="text-xl font-bold text-white">4.8</div>
            <div className="text-xs text-gray-400">Avg Rating</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <Trophy className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <div className="text-xl font-bold text-white">#42</div>
            <div className="text-xs text-gray-400">Global Rank</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Level {userStats.level} Progress</span>
            <span className="text-gray-400 text-sm">2,840 / 5,000 XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '56.8%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-neon-cyan to-neon-green h-3 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-arcade-blue to-arcade-purple rounded-xl p-6 border border-gray-600 mb-8"
      >
        <h2 className="text-2xl font-bold text-white font-arcade mb-6">
          🏆 RECENT ACHIEVEMENTS
        </h2>
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`flex items-center space-x-4 rounded-lg p-4 ${
                achievement.premium 
                  ? 'bg-gradient-to-r from-neon-yellow/20 to-neon-orange/20 border border-neon-yellow/30' 
                  : 'bg-black/30'
              }`}
            >
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white">{achievement.name}</h3>
                  {achievement.premium && <PremiumBadge isPremium={true} size="sm" showText={false} />}
                </div>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
              </div>
              <div className="text-gray-400 text-sm">{achievement.earned}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reddit Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-xl p-6 border border-orange-500/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-arcade mb-2">
              🚀 REDDIT INTEGRATION
            </h3>
            <p className="text-gray-300 mb-4">
              Share your high scores, discover new challenges, and compete with the community!
            </p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
              >
                Share Score
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-orange-500 text-orange-400 font-bold py-2 px-4 rounded-lg text-sm"
              >
                Join r/WackyWorldArcade
              </motion.button>
            </div>
          </div>
          <Reddit className="w-16 h-16 text-orange-500" />
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

export default UserProfile;