import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Star, Zap, Shield, Sparkles, Check } from 'lucide-react';
import { SubscriptionPlan } from '../services/RevenueCatService';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionPlans: SubscriptionPlan[];
  onPurchase: (plan: SubscriptionPlan) => Promise<void>;
  onRestore: () => Promise<void>;
  isLoading: boolean;
}

const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  subscriptionPlans,
  onPurchase,
  onRestore,
  isLoading,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async (plan: SubscriptionPlan) => {
    try {
      setPurchasing(true);
      await onPurchase(plan);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    try {
      setPurchasing(true);
      await onRestore();
    } catch (error) {
      console.error('Restore failed:', error);
    } finally {
      setPurchasing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-arcade-blue to-arcade-purple rounded-2xl border border-neon-cyan/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-600">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Crown className="w-8 h-8 text-neon-yellow" />
                <h2 className="text-3xl font-bold text-white font-arcade">
                  UPGRADE TO PREMIUM
                </h2>
                <Crown className="w-8 h-8 text-neon-yellow" />
              </div>
              <p className="text-gray-300 text-lg">
                Unlock the full Wacky World experience with exclusive games and features!
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-neon-cyan mb-4 text-center font-arcade">
              PREMIUM FEATURES
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Shield, title: 'Ad-Free Gaming', desc: 'No interruptions, pure fun' },
                { icon: Star, title: 'Exclusive Games', desc: '5+ premium mini-games' },
                { icon: Zap, title: 'Unlimited Lives', desc: 'Never stop playing' },
                { icon: Sparkles, title: 'Custom Themes', desc: 'Personalize your experience' },
                { icon: Crown, title: 'Premium Badges', desc: 'Show off on Reddit' },
                { icon: Star, title: 'Priority Support', desc: 'Get help faster' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 rounded-lg p-4 border border-gray-600"
                >
                  <feature.icon className="w-8 h-8 text-neon-green mb-2" />
                  <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Subscription Plans */}
            {subscriptionPlans.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neon-pink mb-4 text-center font-arcade">
                  CHOOSE YOUR PLAN
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {subscriptionPlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 cursor-pointer transition-all ${
                        plan.isPopular
                          ? 'border-neon-yellow shadow-lg shadow-neon-yellow/25'
                          : 'border-gray-600 hover:border-neon-cyan'
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-neon-orange to-neon-pink text-white px-4 py-1 rounded-full text-sm font-bold">
                            MOST POPULAR
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                        <div className="text-3xl font-bold text-neon-cyan mb-1">{plan.price}</div>
                        <div className="text-gray-400 text-sm">per {plan.period}</div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Check className="w-4 h-4 text-neon-green flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePurchase(plan)}
                        disabled={purchasing || isLoading}
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                          plan.isPopular
                            ? 'bg-gradient-to-r from-neon-orange to-neon-pink hover:shadow-lg'
                            : 'bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-lg'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {purchasing ? 'Processing...' : 'Subscribe Now'}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Restore Purchases */}
            <div className="text-center">
              <button
                onClick={handleRestore}
                disabled={purchasing || isLoading}
                className="text-neon-cyan hover:text-neon-yellow transition-colors text-sm underline disabled:opacity-50"
              >
                Already purchased? Restore purchases
              </button>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                Subscriptions auto-renew. Cancel anytime in your account settings.
                <br />
                By purchasing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumModal;