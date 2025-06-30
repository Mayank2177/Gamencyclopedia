export default class SnailRacingLeague {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snails: Array<{ 
    x: number; 
    y: number; 
    speed: number; 
    color: string; 
    name: string; 
    trail: Array<{x: number, y: number}>;
    isPlayer: boolean;
  }> = [];
  private raceStarted = false;
  private raceFinished = false;
  private winner: string | null = null;
  private countdown = 3;
  private animationId: number | null = null;
  private lastCountdown = 0;
  private trackWidth = 60;
  private finishLine = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.finishLine = this.canvas.width - 100;
    this.initializeRace();
    this.gameLoop();
  }

  private initializeRace() {
    const snailNames = ['Speedy', 'Turbo', 'Lightning', 'Flash', 'Rocket'];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
    
    for (let i = 0; i < 5; i++) {
      this.snails.push({
        x: 50,
        y: 100 + i * this.trackWidth,
        speed: 0.2 + Math.random() * 0.3, // Very slow speeds for snails!
        color: colors[i],
        name: snailNames[i],
        trail: [],
        isPlayer: i === 0 // First snail is the player's
      });
    }

    setTimeout(() => this.startCountdown(), 1000);
  }

  private startCountdown() {
    this.lastCountdown = Date.now();
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.raceStarted = true;
      }
    }, 1000);
  }

  private updateGame() {
    if (!this.raceStarted || this.raceFinished) return;

    this.snails.forEach(snail => {
      // Add some randomness to snail movement
      const randomFactor = 0.8 + Math.random() * 0.4;
      snail.x += snail.speed * randomFactor;
      
      // Add to trail
      snail.trail.push({ x: snail.x, y: snail.y });
      if (snail.trail.length > 20) {
        snail.trail.shift();
      }

      // Check for finish
      if (snail.x >= this.finishLine && !this.raceFinished) {
        this.raceFinished = true;
        this.winner = snail.name;
        
        // Update score based on performance
        const scoreElement = document.getElementById('game-score');
        if (scoreElement && snail.isPlayer) {
          scoreElement.textContent = '1000'; // Bonus for winning
        } else if (scoreElement) {
          const placement = this.snails
            .sort((a, b) => b.x - a.x)
            .findIndex(s => s.isPlayer) + 1;
          scoreElement.textContent = Math.max(0, 600 - placement * 100).toString();
        }
      }
    });
  }

  private drawGame() {
    // Clear canvas with grass background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#98FB98');
    gradient.addColorStop(1, '#228B22');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw race tracks
    for (let i = 0; i < 5; i++) {
      const y = 80 + i * this.trackWidth;
      
      // Track background
      this.ctx.fillStyle = i % 2 === 0 ? '#F0E68C' : '#DEB887';
      this.ctx.fillRect(30, y, this.canvas.width - 60, 40);
      
      // Track borders
      this.ctx.strokeStyle = '#8B4513';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(30, y);
      this.ctx.lineTo(this.canvas.width - 30, y);
      this.ctx.moveTo(30, y + 40);
      this.ctx.lineTo(this.canvas.width - 30, y + 40);
      this.ctx.stroke();
    }

    // Draw finish line
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.lineWidth = 4;
    this.ctx.setLineDash([10, 10]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.finishLine, 60);
    this.ctx.lineTo(this.finishLine, 60 + 5 * this.trackWidth);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw snail trails
    this.snails.forEach(snail => {
      if (snail.trail.length > 1) {
        this.ctx.strokeStyle = snail.color + '40';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(snail.trail[0].x, snail.trail[0].y + 15);
        for (let i = 1; i < snail.trail.length; i++) {
          this.ctx.lineTo(snail.trail[i].x, snail.trail[i].y + 15);
        }
        this.ctx.stroke();
      }
    });

    // Draw snails
    this.snails.forEach(snail => {
      // Snail body
      this.ctx.fillStyle = snail.color;
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 10, snail.y + 20, 15, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Shell
      this.ctx.fillStyle = snail.isPlayer ? '#FFD700' : '#8B4513';
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 15, snail.y + 15, 12, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Shell spiral
      this.ctx.strokeStyle = '#654321';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 15, snail.y + 15, 8, 0, Math.PI * 4);
      this.ctx.stroke();
      
      // Eyes
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 5, snail.y + 10, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 12, snail.y + 8, 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 5, snail.y + 10, 1, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(snail.x + 12, snail.y + 8, 1, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Name label
      this.ctx.fillStyle = snail.isPlayer ? '#FFD700' : '#000000';
      this.ctx.font = 'bold 12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(snail.name, snail.x + 15, snail.y - 5);
    });

    // Draw countdown or race status
    this.ctx.fillStyle = '#FF0000';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    
    if (!this.raceStarted && this.countdown > 0) {
      this.ctx.fillText(this.countdown.toString(), this.canvas.width / 2, this.canvas.height / 2);
    } else if (!this.raceStarted && this.countdown <= 0) {
      this.ctx.fillStyle = '#00FF00';
      this.ctx.fillText('GO!', this.canvas.width / 2, this.canvas.height / 2);
    } else if (this.raceFinished && this.winner) {
      this.ctx.fillStyle = this.winner === 'Speedy' ? '#FFD700' : '#FF6B6B';
      this.ctx.font = 'bold 36px Arial';
      this.ctx.fillText(`🏆 ${this.winner} WINS! 🏆`, this.canvas.width / 2, 50);
    }

    // Draw title
    this.ctx.fillStyle = '#4B0082';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🐌 SNAIL RACING LEAGUE 🐌', this.canvas.width / 2, 30);

    // Instructions
    if (!this.raceFinished) {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '14px Arial';
      this.ctx.fillText('Cheer for Speedy (your snail)! The thrill of slow-motion racing!', this.canvas.width / 2, this.canvas.height - 20);
    }
  }

  private gameLoop = () => {
    this.updateGame();
    this.drawGame();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  public restart() {
    this.snails = [];
    this.raceStarted = false;
    this.raceFinished = false;
    this.winner = null;
    this.countdown = 3;
    this.lastCountdown = 0;
    this.initializeRace();
    
    const scoreElement = document.getElementById('game-score');
    if (scoreElement) {
      scoreElement.textContent = '0';
    }
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}