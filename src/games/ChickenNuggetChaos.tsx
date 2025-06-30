export default class ChickenNuggetChaos {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nuggets: Array<{ x: number; y: number; speed: number; size: number }> = [];
  private sauces: Array<{ x: number; y: number; speed: number; size: number }> = [];
  private player = { x: 400, y: 550, width: 60, height: 40 };
  private score = 0;
  private gameRunning = true;
  private animationId: number | null = null;
  private lastNuggetSpawn = 0;
  private lastSauceSpawn = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupEventListeners();
    this.gameLoop();
    this.updateScore();
  }

  private setupEventListeners() {
    // Mouse movement
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.player.x = (e.clientX - rect.left) * (this.canvas.width / rect.width) - this.player.width / 2;
      this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
    });

    // Touch movement for mobile
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.player.x = (touch.clientX - rect.left) * (this.canvas.width / rect.width) - this.player.width / 2;
      this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.player.x = Math.max(0, this.player.x - 20);
      } else if (e.key === 'ArrowRight') {
        this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + 20);
      }
    });
  }

  private spawnNugget() {
    if (Date.now() - this.lastNuggetSpawn > 1500) {
      this.nuggets.push({
        x: Math.random() * (this.canvas.width - 30),
        y: -30,
        speed: 2 + Math.random() * 3,
        size: 20 + Math.random() * 15
      });
      this.lastNuggetSpawn = Date.now();
    }
  }

  private spawnSauce() {
    if (Date.now() - this.lastSauceSpawn > 3000) {
      this.sauces.push({
        x: Math.random() * (this.canvas.width - 30),
        y: -30,
        speed: 1.5 + Math.random() * 2,
        size: 25 + Math.random() * 10
      });
      this.lastSauceSpawn = Date.now();
    }
  }

  private updateGame() {
    if (!this.gameRunning) return;

    this.spawnNugget();
    this.spawnSauce();

    // Update nuggets
    this.nuggets = this.nuggets.filter(nugget => {
      nugget.y += nugget.speed;
      
      // Check collision with player
      if (nugget.x < this.player.x + this.player.width &&
          nugget.x + nugget.size > this.player.x &&
          nugget.y < this.player.y + this.player.height &&
          nugget.y + nugget.size > this.player.y) {
        this.score += 10;
        this.updateScore();
        return false; // Remove nugget
      }
      
      return nugget.y < this.canvas.height + 50;
    });

    // Update sauces
    this.sauces = this.sauces.filter(sauce => {
      sauce.y += sauce.speed;
      
      // Check collision with player (game over)
      if (sauce.x < this.player.x + this.player.width &&
          sauce.x + sauce.size > this.player.x &&
          sauce.y < this.player.y + this.player.height &&
          sauce.y + sauce.size > this.player.y) {
        this.gameOver();
        return false;
      }
      
      return sauce.y < this.canvas.height + 50;
    });
  }

  private drawGame() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw player (basket)
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    this.ctx.fillStyle = '#D2691E';
    this.ctx.fillRect(this.player.x + 5, this.player.y + 5, this.player.width - 10, this.player.height - 10);

    // Draw nuggets
    this.nuggets.forEach(nugget => {
      this.ctx.fillStyle = '#DAA520';
      this.ctx.beginPath();
      this.ctx.arc(nugget.x + nugget.size/2, nugget.y + nugget.size/2, nugget.size/2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add nugget texture
      this.ctx.fillStyle = '#FFD700';
      this.ctx.beginPath();
      this.ctx.arc(nugget.x + nugget.size/2 - 3, nugget.y + nugget.size/2 - 3, 3, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw sauce spills
    this.sauces.forEach(sauce => {
      this.ctx.fillStyle = '#DC143C';
      this.ctx.beginPath();
      this.ctx.arc(sauce.x + sauce.size/2, sauce.y + sauce.size/2, sauce.size/2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add sauce drip effect
      this.ctx.fillStyle = '#B22222';
      this.ctx.fillRect(sauce.x + sauce.size/2 - 2, sauce.y + sauce.size, 4, 10);
    });

    // Draw game title
    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🍗 CHICKEN NUGGET CHAOS 🍗', this.canvas.width / 2, 40);

    // Draw instructions
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.fillText('Move to collect nuggets! Avoid the sauce!', this.canvas.width / 2, this.canvas.height - 20);
  }

  private gameLoop = () => {
    this.updateGame();
    this.drawGame();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private updateScore() {
    const scoreElement = document.getElementById('game-score');
    if (scoreElement) {
      scoreElement.textContent = this.score.toString();
    }
  }

  private gameOver() {
    this.gameRunning = false;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#FF6B6B';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER!', this.canvas.width / 2, this.canvas.height / 2 - 50);
    
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '24px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2);
    
    this.ctx.font = '16px Arial';
    this.ctx.fillText('Click the restart button to play again!', this.canvas.width / 2, this.canvas.height / 2 + 50);
  }

  public restart() {
    this.nuggets = [];
    this.sauces = [];
    this.score = 0;
    this.gameRunning = true;
    this.player.x = 400;
    this.lastNuggetSpawn = 0;
    this.lastSauceSpawn = 0;
    this.updateScore();
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
