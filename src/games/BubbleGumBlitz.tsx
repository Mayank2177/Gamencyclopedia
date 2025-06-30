export default class BubbleGumBlitz {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bubbles: Array<{ x: number; y: number; size: number; growing: boolean; maxSize: number; color: string }> = [];
  private enemies: Array<{ x: number; y: number; vx: number; vy: number; size: number; trapped: boolean }> = [];
  private score = 0;
  private gameRunning = true;
  private animationId: number | null = null;
  private lastEnemySpawn = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupEventListeners();
    this.gameLoop();
    this.updateScore();
  }

  private setupEventListeners() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
      this.createBubble(x, y);
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
      this.createBubble(x, y);
    });
  }

  private createBubble(x: number, y: number) {
    const colors = ['#FF69B4', '#00CED1', '#98FB98', '#FFB6C1', '#87CEEB'];
    this.bubbles.push({
      x,
      y,
      size: 10,
      growing: true,
      maxSize: 60 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  private spawnEnemy() {
    if (Date.now() - this.lastEnemySpawn > 2000) {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch (side) {
        case 0: // Top
          x = Math.random() * this.canvas.width;
          y = -20;
          vx = (Math.random() - 0.5) * 4;
          vy = 1 + Math.random() * 2;
          break;
        case 1: // Right
          x = this.canvas.width + 20;
          y = Math.random() * this.canvas.height;
          vx = -(1 + Math.random() * 2);
          vy = (Math.random() - 0.5) * 4;
          break;
        case 2: // Bottom
          x = Math.random() * this.canvas.width;
          y = this.canvas.height + 20;
          vx = (Math.random() - 0.5) * 4;
          vy = -(1 + Math.random() * 2);
          break;
        default: // Left
          x = -20;
          y = Math.random() * this.canvas.height;
          vx = 1 + Math.random() * 2;
          vy = (Math.random() - 0.5) * 4;
      }

      this.enemies.push({
        x, y, vx, vy,
        size: 15 + Math.random() * 10,
        trapped: false
      });
      
      this.lastEnemySpawn = Date.now();
    }
  }

  private updateGame() {
    if (!this.gameRunning) return;

    this.spawnEnemy();

    // Update bubbles
    this.bubbles = this.bubbles.filter(bubble => {
      if (bubble.growing) {
        bubble.size += 2;
        if (bubble.size >= bubble.maxSize) {
          bubble.growing = false;
          setTimeout(() => {
            bubble.size = 0;
          }, 3000);
        }
      } else {
        bubble.size = Math.max(0, bubble.size - 1);
      }
      return bubble.size > 0;
    });

    // Update enemies
    this.enemies.forEach(enemy => {
      if (!enemy.trapped) {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        // Check bubble collisions
        this.bubbles.forEach(bubble => {
          const dx = enemy.x - bubble.x;
          const dy = enemy.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < bubble.size / 2 + enemy.size / 2 && !enemy.trapped) {
            enemy.trapped = true;
            this.score += 50;
            this.updateScore();
          }
        });

        // Bounce off walls
        if (enemy.x < 0 || enemy.x > this.canvas.width) enemy.vx *= -1;
        if (enemy.y < 0 || enemy.y > this.canvas.height) enemy.vy *= -1;
      }
    });

    // Remove enemies that are too far from canvas
    this.enemies = this.enemies.filter(enemy => {
      if (enemy.trapped) return true;
      return enemy.x > -100 && enemy.x < this.canvas.width + 100 &&
             enemy.y > -100 && enemy.y < this.canvas.height + 100;
    });
  }

  private drawGame() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#4B0082');
    gradient.addColorStop(1, '#9400D3');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw bubbles
    this.bubbles.forEach(bubble => {
      const bubbleGradient = this.ctx.createRadialGradient(
        bubble.x, bubble.y, 0,
        bubble.x, bubble.y, bubble.size / 2
      );
      bubbleGradient.addColorStop(0, bubble.color + '80');
      bubbleGradient.addColorStop(0.8, bubble.color + '40');
      bubbleGradient.addColorStop(1, bubble.color + '10');
      
      this.ctx.fillStyle = bubbleGradient;
      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Bubble highlight
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.beginPath();
      this.ctx.arc(bubble.x - bubble.size/6, bubble.y - bubble.size/6, bubble.size/8, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw enemies
    this.enemies.forEach(enemy => {
      this.ctx.fillStyle = enemy.trapped ? '#32CD32' : '#FF4500';
      this.ctx.beginPath();
      this.ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Enemy eyes
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(enemy.x - enemy.size/3, enemy.y - enemy.size/3, enemy.size/4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(enemy.x + enemy.size/3, enemy.y - enemy.size/3, enemy.size/4, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(enemy.x - enemy.size/3, enemy.y - enemy.size/3, enemy.size/8, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(enemy.x + enemy.size/3, enemy.y - enemy.size/3, enemy.size/8, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw game title
    this.ctx.fillStyle = '#FFB6C1';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🫧 BUBBLE GUM BLITZ 🫧', this.canvas.width / 2, 40);

    // Draw instructions
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.fillText('Click to create bubbles and trap the enemies!', this.canvas.width / 2, this.canvas.height - 20);
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

  public restart() {
    this.bubbles = [];
    this.enemies = [];
    this.score = 0;
    this.gameRunning = true;
    this.lastEnemySpawn = 0;
    this.updateScore();
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}