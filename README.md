# Wacky World Arcade

A wildly creative collection of 15+ mini-games with Reddit integration and premium features powered by RevenueCat.

## Features

### 🎮 Game Collection
- **15+ Mini-Games**: From Chicken Nugget Chaos to Quantum Cat Simulator
- **Multiple Categories**: Casual, Arcade, and Adventure games
- **Difficulty Levels**: 1-5 star rating system
- **Responsive Design**: Works on desktop and mobile

### 👑 Premium Features (RevenueCat Integration)
- **Ad-Free Experience**: No interruptions during gameplay
- **Exclusive Games**: 5+ premium-only mini-games
- **Unlimited Lives**: Never stop playing
- **Custom Themes**: Personalize your arcade experience
- **Premium Badges**: Show off your status on Reddit
- **Priority Support**: Get help faster

### 🚀 Reddit Integration
- **User Profiles**: Connect with Reddit accounts
- **Score Sharing**: Share high scores with the community
- **Community Features**: Join r/WackyWorldArcade
- **Achievement System**: Unlock badges and achievements

## Setup Instructions

### 1. RevenueCat Setup

1. **Create a RevenueCat Account**
   - Go to [RevenueCat Dashboard](https://app.revenuecat.com)
   - Create a new project for your arcade

2. **Configure Products**
   - Create entitlements: `ad_free`, `exclusive_games`, `unlimited_lives`, `custom_themes`
   - Set up subscription products (monthly/annual)
   - Configure offerings with your products

3. **Get API Keys**
   - Copy your public API key from the RevenueCat dashboard
   - Add it to your `.env` file:
   ```
   VITE_REVENUECAT_PUBLIC_API_KEY=your_actual_api_key_here
   ```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# RevenueCat Configuration
VITE_REVENUECAT_PUBLIC_API_KEY=your_revenuecat_public_api_key_here

# App Configuration
VITE_APP_NAME=Wacky World Arcade
VITE_APP_VERSION=1.0.0

# Reddit Integration (optional)
VITE_REDDIT_CLIENT_ID=your_reddit_client_id
VITE_REDDIT_REDIRECT_URI=your_redirect_uri
```

### 3. Installation

```bash
npm install
npm run dev
```

## Premium Subscription Tiers

### Monthly Premium ($4.99/month)
- All premium features
- Monthly billing
- Cancel anytime

### Annual Premium ($29.99/year)
- All premium features
- Save 50% compared to monthly
- Most popular option

## Game Categories

### 🎯 Casual Games
- Chicken Nugget Chaos
- Bubble Gum Blitz
- Snail Racing League
- Kitty Disco Fever
- Donut Defender

### 🕹️ Arcade Games
- Dance Battle: Objects
- Cloud Hopper
- Toilet Plunger Hero
- Pizza Delivery in Space
- Mermaid Makeup Madness

### 🚀 Adventure Games
- Dream Walker
- Plant Whisperer
- Shadow Puppet Warfare
- Food Mutation Lab
- Time Traveler's Wardrobe

### 👑 Premium Exclusive Games
- Quantum Cat Simulator
- Interdimensional Pizza Delivery
- Emoji Evolution Lab
- Time Loop Escape Room
- Cosmic Karaoke Battle

## Technical Architecture

### RevenueCat Integration
- **Service Layer**: `src/services/RevenueCatService.ts`
- **React Hook**: `src/hooks/useRevenueCat.ts`
- **Components**: Premium modal, gates, and badges
- **Entitlements**: Feature-based access control

### Premium Features
- **Feature Gating**: Components automatically check premium status
- **Subscription Management**: Handle purchases and restoration
- **User Experience**: Seamless upgrade flows

### Game Engine
- **Canvas-based**: HTML5 Canvas for smooth gameplay
- **Modular Design**: Each game is a separate class
- **Mobile Support**: Touch and mouse controls
- **Performance**: Optimized for 60fps gameplay

## Monetization Strategy

1. **Freemium Model**: Core games free, premium features paid
2. **Subscription Tiers**: Monthly and annual options
3. **Value Proposition**: Exclusive content and enhanced experience
4. **Community Integration**: Reddit-based social features

## Development

### Adding New Games
1. Create game class in `src/games/`
2. Add to game data in `src/data/games.tsx`
3. Update GameCanvas component to handle new game
4. For premium games, add to `src/data/premiumGames.ts`

### Adding Premium Features
1. Update `PremiumFeatures` interface
2. Add entitlement checks in RevenueCat service
3. Implement feature gating in components
4. Update subscription plan features

## Deployment

The app is ready for deployment to any static hosting service:

```bash
npm run build
```

Deploy the `dist` folder to your hosting provider.

## Support

For technical support or feature requests:
- Join r/WackyWorldArcade
- Create an issue on GitHub
- Contact premium support (for subscribers)

---

Built with React, TypeScript, Tailwind CSS, Framer Motion, and RevenueCat.