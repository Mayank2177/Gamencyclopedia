import React from 'react';
import { motion } from 'framer-motion';
import { Game } from '../types/Game';
import { Trophy, Zap, Clock, Users } from 'lucide-react';

interface StatsOverviewProps {
  games: Game[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ games }) => {
  const playableGames = games.filter(game => game.isPlayable).length;
  const totalGames = games.length;
  const avgDifficulty = (games.reduce((sum, game) => sum + game.difficulty, 0) / games.length).toFixed(1);

  const stats = [
    {
      icon: Trophy,
      label: 'Total Games',
      value: totalGames,
      color: 'text-neon-yellow',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: Zap,
      label: 'Playable Now',
      value: playableGames,
      color: 'text-neon-green',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: Clock,
      label: 'Avg Difficulty',
      value: `${avgDifficulty}/5`,
      color: 'text-neon-cyan',
      bgColor: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      icon: Users,
      label: 'Reddit Players',
      value: '2.4K',
      color: 'text-neon-pink',
      bgColor: 'from-pink-500/20 to-purple-500/20',
      borderColor: 'border-pink-500/30'
    },
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 text-center group hover:scale-105 transition-transform`}
          >
            <div className="flex flex-col items-center space-y-2">
              <stat.icon className={`w-8 h-8 ${stat.color} group-hover:animate-pulse`} />
              <div className={`text-2xl font-bold ${stat.color} font-arcade`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;