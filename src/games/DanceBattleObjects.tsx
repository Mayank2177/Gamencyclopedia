export default class DanceBattleObjects {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player = { x: 150, y: 400, dance: 0, score: 0 };
  private opponent = { x: 550, y: 400, dance: 0, type: 'lamp', name: 'Disco Lamp' };
  private danceSequence: string[] = [];
  private playerSequence: string[] = [];
  private currentBeat = 0;
  private gamePhase: 'intro' | 'watching' | 'dancing' | 'result' = 'intro';
  private animationId: number | null = null;
  private beatTimer = 0;
  private sequenceLength = 4;
  private round = 1;
  private objects = ['lamp', 'chair', 'toaster', 'cactus', 'rubber_duck'];
  private objectNames = ['Disco Lamp', 'Funky Chair', 'Toaster Groove', 'Dancing Cactus', 'Rubber Ducky'];

  private moves = ['↑', '↓', '←', '→'];
  private particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupEventListeners();
    this.startNewRound();
    this.gameLoop();
  }

  private setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (this.gamePhase !== 'dancing') return;
      
      let move = '';
      switch (e.key) {
        case 'ArrowUp': move = '↑'; break;
        case 'ArrowDown': move = '↓'; break;
        case 'ArrowLeft': move = '←'; break;
        case 'ArrowRight': move = '→'; break;
        default: return;
      }
      
      this.playerSequence.push(move);
      this.addParticles(this.player.x, this.player.y, '#FFD700');
      
      if (this.playerSequence.length >= this.danceSequence.length) {
        this.checkSequence();
      }
    });
  }

  private startNewRound() {
    this.gamePhase = 'intro';
    this.currentBeat = 0;
    this.beatTimer = 0;
    this.danceSequence = [];
    this.playerSequence = [];
    
    // Select random opponent
    const objIndex = Math.floor(Math.random() * this.objects.length);
    this.opponent.type = this.objects[objIndex];
    this.opponent.name = this.objectNames[objIndex];
    
    // Generate dance sequence
    for (let i = 0; i < this.sequenceLength; i++) {
      this.danceSequence.push(this.moves[Math.floor(Math.random() * this.moves.length)]);
    }
    
    setTimeout(() => {
      this.gamePhase = 'watching';
    }, 2000);
  }

  private checkSequence() {
    let correct = 0;
    for (let i = 0; i < this.danceSequence.length; i++) {
      if (this.playerSequence[i] === this.danceSequence[i]) {
        correct++;
      }
    }
    
    const accuracy = correct / this.danceSequence.length;
    const points = Math.floor(accuracy * 100 * this.round);
    this.player.score += points;
    
    this.gamePhase = 'result';
    
    // Update score display
    const scoreElement = document.getElementById('game-score');
    if (scoreElement) {
      scoreElement.textContent = this.player.score.toString();
    }
    
    setTimeout(() => {
      if (accuracy >= 0.8) {
        this.round++;
        this.sequenceLength = Math.min(8, 3 + this.round);
        this.startNewRound();
      } else {
        this.gamePhase = 'watching';
        this.currentBeat = 0;
        this.playerSequence = [];
      }
    }, 3000);
  }

  private addParticles(x: number, y: number, color: string) {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: x + 50,
        y: y + 50,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 60,
        color
      });
    }
  }

  private updateGame() {
    this.beatTimer++;
    
    if (this.gamePhase === 'watching' && this.beatTimer % 60 === 0) {
      if (this.currentBeat < this.danceSequence.length) {
        // Show opponent's move
        this.addParticles(this.opponent.x, this.opponent.y, '#FF69B4');
        this.currentBeat++;
      } else {
        this.gamePhase = 'dancing';
        this.currentBeat = 0;
        this.beatTimer = 0;
      }
    }
    
    // Update particles
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      return particle.life > 0;
    });
    
    // Update dance animations
    this.player.dance = (this.player.dance + 0.2) % (Math.PI * 2);
    this.opponent.dance = (this.opponent.dance + 0.15) % (Math.PI * 2);
  }

  private drawObject(x: number, y: number, type: string, dance: number) {
    this.ctx.save();
    this.ctx.translate(x + 50, y + 50);
    this.ctx.rotate(Math.sin(dance) * 0.2);
    
    switch (type) {
      case 'lamp':
        // Lamp base
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(-15, 20, 30, 40);
        // Lamp shade
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.moveTo(-30, 20);
        this.ctx.lineTo(30, 20);
        this.ctx.lineTo(20, -20);
        this.ctx.lineTo(-20, -20);
        this.ctx.closePath();
        this.ctx.fill();
        break;
        
      case 'chair':
        // Chair seat
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(-25, 10, 50, 15);
        // Chair back
        this.ctx.fillRect(-25, -30, 50, 40);
        // Chair legs
        this.ctx.fillRect(-20, 25, 8, 30);
        this.ctx.fillRect(12, 25, 8, 30);
        break;
        
      case 'toaster':
        // Toaster body
        this.ctx.fillStyle = '#C0C0C0';
        this.ctx.fillRect(-20, -10, 40, 30);
        // Toaster slots
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(-15, -5, 12, 20);
        this.ctx.fillRect(3, -5, 12, 20);
        break;
        
      case 'cactus':
        // Cactus body
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(-8, -20, 16, 50);
        // Cactus arms
        this.ctx.fillRect(-25, 0, 15, 8);
        this.ctx.fillRect(10, -10, 15, 8);
        // Spikes
        this.ctx.fillStyle = '#FFFF00';
        for (let i = 0; i < 6; i++) {
          this.ctx.fillRect(-2, -15 + i * 8, 4, 2);
        }
        break;
        
      case 'rubber_duck':
        // Duck body
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 25, 0, Math.PI * 2);
        this.ctx.fill();
        // Duck head
        this.ctx.beginPath();
        this.ctx.arc(-5, -15, 15, 0, Math.PI * 2);
        this.ctx.fill();
        // Duck beak
        this.ctx.fillStyle = '#FF8C00';
        this.ctx.beginPath();
        this.ctx.arc(-18, -12, 5, 0, Math.PI * 2);
        this.ctx.fill();
        // Duck eye
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(-8, -18, 3, 0, Math.PI * 2);
        this.ctx.fill();
        break;
    }
    
    this.ctx.restore();
  }

  private drawGame() {
    // Clear canvas with disco background
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#4B0082');
    gradient.addColorStop(0.5, '#8B008B');
    gradient.addColorStop(1, '#9400D3');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw disco floor pattern
    for (let x = 0; x < this.canvas.width; x += 40) {
      for (let y = 400; y < this.canvas.height; y += 40) {
        const brightness = Math.sin((x + y + this.beatTimer) * 0.05) * 0.5 + 0.5;
        this.ctx.fillStyle = `hsl(${(x + y + this.beatTimer) % 360}, 50%, ${20 + brightness * 30}%)`;
        this.ctx.fillRect(x, y, 40, 40);
      }
    }
    
    // Draw characters
    // Player (stick figure)
    this.ctx.save();
    this.ctx.translate(this.player.x + 50, this.player.y + 50);
    this.ctx.rotate(Math.sin(this.player.dance) * 0.1);
    
    // Head
    this.ctx.fillStyle = '#FFD700';
    this.ctx.beginPath();
    this.ctx.arc(0, -40, 12, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Body
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -28);
    this.ctx.lineTo(0, 20);
    this.ctx.stroke();
    
    // Arms
    const armAngle = Math.sin(this.player.dance * 2) * 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -10);
    this.ctx.lineTo(-20 * Math.cos(armAngle), -10 + 20 * Math.sin(armAngle));
    this.ctx.moveTo(0, -10);
    this.ctx.lineTo(20 * Math.cos(armAngle), -10 + 20 * Math.sin(armAngle));
    this.ctx.stroke();
    
    // Legs
    const legAngle = Math.sin(this.player.dance * 1.5) * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 20);
    this.ctx.lineTo(-15 * Math.cos(legAngle), 45 + 15 * Math.sin(legAngle));
    this.ctx.moveTo(0, 20);
    this.ctx.lineTo(15 * Math.cos(legAngle), 45 + 15 * Math.sin(legAngle));
    this.ctx.stroke();
    
    this.ctx.restore();
    
    // Draw opponent
    this.drawObject(this.opponent.x, this.opponent.y, this.opponent.type, this.opponent.dance);
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.fillStyle = particle.color + Math.floor(particle.life / 60 * 255).toString(16).padStart(2, '0');
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw UI
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('💃 DANCE BATTLE: OBJECTS 🕺', this.canvas.width / 2, 40);
    
    // Draw opponent name
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`VS ${this.opponent.name}`, this.canvas.width / 2, 70);
    
    // Draw game phase info
    this.ctx.font = 'bold 18px Arial';
    switch (this.gamePhase) {
      case 'intro':
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillText(`Round ${this.round} - Get Ready!`, this.canvas.width / 2, 100);
        break;
      case 'watching':
        this.ctx.fillStyle = '#00CED1';
        this.ctx.fillText('Watch the moves!', this.canvas.width / 2, 100);
        break;
      case 'dancing':
        this.ctx.fillStyle = '#FF69B4';
        this.ctx.fillText('Your turn! Use arrow keys!', this.canvas.width / 2, 100);
        break;
      case 'result':
        this.ctx.fillStyle = '#32CD32';
        this.ctx.fillText('Nice moves!', this.canvas.width / 2, 100);
        break;
    }
    
    // Draw dance sequence
    if (this.gamePhase === 'watching' || this.gamePhase === 'dancing') {
      this.ctx.font = 'bold 32px Arial';
      this.ctx.textAlign = 'left';
      let x = 50;
      
      this.danceSequence.forEach((move, i) => {
        if (this.gamePhase === 'watching' && i < this.currentBeat) {
          this.ctx.fillStyle = '#FF69B4';
        } else if (this.gamePhase === 'dancing' && i < this.playerSequence.length) {
          this.ctx.fillStyle = this.playerSequence[i] === move ? '#32CD32' : '#FF6B6B';
        } else {
          this.ctx.fillStyle = '#CCCCCC';
        }
        
        this.ctx.fillText(move, x, 150);
        x += 50;
      });
    }
    
    // Instructions
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Challenge everyday objects to epic dance battles!', this.canvas.width / 2, this.canvas.height - 20);
  }

  private gameLoop = () => {
    this.updateGame();
    this.drawGame();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  public restart() {
    this.player.score = 0;
    this.round = 1;
    this.sequenceLength = 4;
    this.particles = [];
    this.startNewRound();
    
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