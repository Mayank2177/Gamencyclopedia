import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';

interface PremiumBadgeProps {
  isPremium: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  isPremium, 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  if (!isPremium) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center space-x-1 bg-gradient-to-r from-neon-yellow to-neon-orange text-arcade-dark font-bold rounded-full ${sizeClasses[size]} ${className}`}
    >
      <Crown size={iconSizes[size]} />
      {showText && <span>PREMIUM</span>}
      <Sparkles size={iconSizes[size]} className="animate-pulse" />
    </motion.div>
  );
};

export default PremiumBadge;