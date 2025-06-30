import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import GameBrowser from './components/GameBrowser';
import GameCanvas from './components/GameCanvas';
import UserProfile from './components/UserProfile';
import { Game, GameCategory } from './types/Game';
import { gameData } from './data/games';

function App() {
  const [currentView, setCurrentView] = useState<'browser' | 'game' | 'profile'>('browser');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>('all');

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentView('game');
  };

  const handleBackToBrowser = () => {
    setCurrentView('browser');
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arcade-darker via-arcade-dark to-arcade-blue">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        onBackClick={handleBackToBrowser}
      />
      
      <AnimatePresence mode="wait">
        {currentView === 'browser' && (
          <motion.div
            key="browser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GameBrowser
              games={gameData}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onGameSelect={handleGameSelect}
            />
          </motion.div>
        )}
        
        {currentView === 'game' && selectedGame && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <GameCanvas 
              game={selectedGame}
              onBack={handleBackToBrowser}
            />
          </motion.div>
        )}
        
        {currentView === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <UserProfile />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
