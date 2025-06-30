import Purchases, { 
  PurchasesOffering, 
  PurchasesPackage, 
  CustomerInfo,
  PurchasesEntitlementInfo 
} from '@revenuecat/purchases-js';

export interface PremiumFeatures {
  isPremium: boolean;
  hasAdFree: boolean;
  hasExclusiveGames: boolean;
  hasUnlimitedLives: boolean;
  hasCustomThemes: boolean;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  rcPackage: PurchasesPackage;
}

class RevenueCatService {
  private initialized = false;
  private customerInfo: CustomerInfo | null = null;
  private offerings: PurchasesOffering[] = [];

  async initialize(apiKey: string, userId?: string): Promise<void> {
    try {
      await Purchases.configure({
        apiKey,
        appUserId: userId,
      });
      
      this.initialized = true;
      await this.refreshCustomerInfo();
      await this.loadOfferings();
      
      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  async refreshCustomerInfo(): Promise<CustomerInfo> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      this.customerInfo = await Purchases.getCustomerInfo();
      return this.customerInfo;
    } catch (error) {
      console.error('Failed to refresh customer info:', error);
      throw error;
    }
  }

  async loadOfferings(): Promise<PurchasesOffering[]> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const offerings = await Purchases.getOfferings();
      this.offerings = Object.values(offerings.all);
      return this.offerings;
    } catch (error) {
      console.error('Failed to load offerings:', error);
      throw error;
    }
  }

  getPremiumFeatures(): PremiumFeatures {
    if (!this.customerInfo) {
      return {
        isPremium: false,
        hasAdFree: false,
        hasExclusiveGames: false,
        hasUnlimitedLives: false,
        hasCustomThemes: false,
      };
    }

    const entitlements = this.customerInfo.entitlements.active;
    
    return {
      isPremium: Object.keys(entitlements).length > 0,
      hasAdFree: 'ad_free' in entitlements,
      hasExclusiveGames: 'exclusive_games' in entitlements,
      hasUnlimitedLives: 'unlimited_lives' in entitlements,
      hasCustomThemes: 'custom_themes' in entitlements,
    };
  }

  getSubscriptionPlans(): SubscriptionPlan[] {
    const currentOffering = this.offerings.find(o => o.identifier === 'premium') || this.offerings[0];
    
    if (!currentOffering) {
      return [];
    }

    return Object.values(currentOffering.availablePackages).map(pkg => {
      const isMonthly = pkg.packageType === 'MONTHLY';
      const isAnnual = pkg.packageType === 'ANNUAL';
      
      return {
        id: pkg.identifier,
        title: isMonthly ? 'Premium Monthly' : isAnnual ? 'Premium Annual' : 'Premium',
        description: isMonthly ? 'Monthly subscription' : isAnnual ? 'Annual subscription (Save 50%)' : 'Premium access',
        price: pkg.product.priceString,
        period: isMonthly ? 'month' : isAnnual ? 'year' : 'one-time',
        features: [
          '🚫 Ad-free gaming experience',
          '🎮 Access to 5+ exclusive games',
          '❤️ Unlimited lives and retries',
          '🎨 Custom themes and avatars',
          '🏆 Premium leaderboards',
          '💎 Exclusive Reddit badges'
        ],
        isPopular: isAnnual,
        rcPackage: pkg
      };
    });
  }

  async purchasePackage(rcPackage: PurchasesPackage): Promise<CustomerInfo> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const { customerInfo } = await Purchases.purchasePackage(rcPackage);
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  async restorePurchases(): Promise<CustomerInfo> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      this.customerInfo = await Purchases.restorePurchases();
      return this.customerInfo;
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  async setUserId(userId: string): Promise<void> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      await Purchases.logIn(userId);
      await this.refreshCustomerInfo();
    } catch (error) {
      console.error('Failed to set user ID:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    if (!this.initialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      await Purchases.logOut();
      this.customerInfo = null;
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }

  isEntitlementActive(entitlementId: string): boolean {
    if (!this.customerInfo) return false;
    return entitlementId in this.customerInfo.entitlements.active;
  }

  getEntitlementInfo(entitlementId: string): PurchasesEntitlementInfo | null {
    if (!this.customerInfo) return null;
    return this.customerInfo.entitlements.active[entitlementId] || null;
  }
}

export const revenueCatService = new RevenueCatService();