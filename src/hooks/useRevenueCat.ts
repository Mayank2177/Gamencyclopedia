import { useState, useEffect, useCallback } from 'react';
import { revenueCatService, PremiumFeatures, SubscriptionPlan } from '../services/RevenueCatService';
import { CustomerInfo } from '@revenuecat/purchases-js';

export interface UseRevenueCatReturn {
  isInitialized: boolean;
  premiumFeatures: PremiumFeatures;
  subscriptionPlans: SubscriptionPlan[];
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  error: string | null;
  purchasePackage: (plan: SubscriptionPlan) => Promise<void>;
  restorePurchases: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useRevenueCat = (apiKey?: string, userId?: string): UseRevenueCatReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [premiumFeatures, setPremiumFeatures] = useState<PremiumFeatures>({
    isPremium: false,
    hasAdFree: false,
    hasExclusiveGames: false,
    hasUnlimitedLives: false,
    hasCustomThemes: false,
  });
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const info = await revenueCatService.refreshCustomerInfo();
      setCustomerInfo(info);
      setPremiumFeatures(revenueCatService.getPremiumFeatures());
      
      const plans = revenueCatService.getSubscriptionPlans();
      setSubscriptionPlans(plans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeRevenueCat = async () => {
      if (!apiKey) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        await revenueCatService.initialize(apiKey, userId);
        setIsInitialized(true);
        
        await refreshData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize RevenueCat');
        setIsLoading(false);
      }
    };

    initializeRevenueCat();
  }, [apiKey, userId, refreshData]);

  const purchasePackage = useCallback(async (plan: SubscriptionPlan) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const info = await revenueCatService.purchasePackage(plan.rcPackage);
      setCustomerInfo(info);
      setPremiumFeatures(revenueCatService.getPremiumFeatures());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purchase failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restorePurchases = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const info = await revenueCatService.restorePurchases();
      setCustomerInfo(info);
      setPremiumFeatures(revenueCatService.getPremiumFeatures());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Restore failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isInitialized,
    premiumFeatures,
    subscriptionPlans,
    customerInfo,
    isLoading,
    error,
    purchasePackage,
    restorePurchases,
    refreshData,
  };
};