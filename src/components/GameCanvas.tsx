import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';
import { Game } from '../types/Game';
import ChickenNuggetChaos from '../games/ChickenNuggetChaos';
import BubbleGumBlitz from '../games/BubbleGumBlitz';
import SnailRacingLeague from '../games/SnailRacingLeague';
import DanceBattleObjects from '../games/DanceBattleObjects';

interface GameCanvasProps {
  game: Game;
  onBack: () => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ game, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || !game.isPlayable) return;

    // Initialize the specific game
    switch (game.id) {
      case 'chicken-nugget-chaos':
        gameInstanceRef.current = new ChickenNuggetChaos(canvasRef.current);
        break;
      case 'bubble-gum-blitz':
        gameInstanceRef.current = new BubbleGumBlitz(canvasRef.current);
        break;
      case 'snail-racing-league':
        gameInstanceRef.current = new SnailRacingLeague(canvasRef.current);
        break;
      case 'dance-battle-objects':
        gameInstanceRef.current = new DanceBattleObjects(canvasRef.current);
        break;
      default:
        console.warn(`Game ${game.id} not implemented yet`);
    }

    return () => {
      if (gameInstanceRef.current && gameInstanceRef.current.destroy) {
        gameInstanceRef.current.destroy();
      }
    };
  }, [game.id]);

  const handleRestart = () => {
    if (gameInstanceRef.current && gameInstanceRef.current.restart) {
      gameInstanceRef.current.restart();
    }
  };

  if (!game.isPlayable) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-arcade-blue to-arcade-purple rounded-xl p-8 text-center border border-gray-600"
        >
          <div className="text-6xl mb-4">{game.icon}</div>
          <h2 className="text-3xl font-bold text-white mb-4 font-arcade">{game.title}</h2>
          <p className="text-gray-300 mb-6 text-lg">{game.description}</p>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 font-bold">🚧 Coming Soon! 🚧</p>
            <p className="text-yellow-200 text-sm mt-2">
              This game is still in development. Join our Reddit community to get notified when it's ready!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-gradient-to-r from-neon-cyan to-neon-blue text-white font-bold py-3 px-6 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Games
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Game Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 rounded-lg bg-neon-cyan text-arcade-dark hover:bg-neon-yellow transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-white font-arcade flex items-center space-x-2">
              <span>{game.icon}</span>
              <span>{game.title}</span>
            </h1>
            <p className="text-gray-300">{game.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRestart}
            className="p-2 rounded-lg bg-neon-green text-arcade-dark hover:bg-neon-yellow transition-colors"
          >
            <RotateCcw size={20} />
          </motion.button>
          <div className="text-right">
            <div className="text-neon-yellow font-bold text-sm">HIGH SCORE</div>
            <div className="text-white font-arcade">1,250</div>
          </div>
        </div>
      </motion.div>

      {/* Game Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-black rounded-xl overflow-hidden border-4 border-neon-cyan shadow-2xl shadow-neon-cyan/25"
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full max-w-full block"
          style={{ aspectRatio: '4/3' }}
        />
        
        {/* Game Overlay UI */}
        <div className="absolute top-4 left-4 text-white font-arcade">
          <div className="bg-black/50 rounded-lg p-2">
            <div className="text-neon-green text-sm">SCORE: <span id="game-score">0</span></div>
            <div className="text-neon-yellow text-sm">LEVEL: <span id="game-level">1</span></div>
          </div>
        </div>
      </motion.div>

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-gradient-to-r from-arcade-blue to-arcade-purple rounded-xl p-6 border border-gray-600"
      >
        <h3 className="text-xl font-bold text-neon-cyan mb-3 font-arcade">HOW TO PLAY</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="font-bold text-white mb-2">Controls:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Click/Tap to interact</li>
              <li>• Arrow keys to move</li>
              <li>• Space to jump/action</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Objective:</h4>
            <p className="text-sm">{game.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameCanvas;