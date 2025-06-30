import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown, Star } from 'lucide-react';

interface PremiumGateProps {
  isLocked: boolean;
  onUpgrade: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const PremiumGate: React.FC<PremiumGateProps> = ({
  isLocked,
  onUpgrade,
  children,
  title = "Premium Feature",
  description = "Upgrade to premium to unlock this feature"
}) => {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {children}
      </div>
      
      {/* Premium overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-arcade-blue/90 to-arcade-purple/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
      >
        <div className="text-center p-6">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mb-4"
          >
            <Crown className="w-16 h-16 text-neon-yellow mx-auto" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mb-2 font-arcade">
            {title}
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            {description}
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpgrade}
            className="bg-gradient-to-r from-neon-yellow to-neon-orange text-arcade-dark font-bold py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-neon-yellow/25 transition-all"
          >
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Upgrade Now</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumGate;