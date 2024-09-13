const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');

let score = 0;
let health = 100;
let targets = [];
let arrows = [];

// Target class
class Target {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.hit = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.hit ? 'red' : 'blue';
        ctx.fill();
        ctx.closePath();
    }

    isHit(arrow) {
        const dx = this.x - arrow.x;
        const dy = this.y - arrow.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius;
    }
}

// Arrow class
class Arrow {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 10, this.y - 10);
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.closePath();
    }
}

// Initialize game
function init() {
    targets.push(new Target(600, 300, 30));
    targets.push(new Target(300, 400, 30));
    document.addEventListener('click', shootArrow);
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw arrows
    arrows.forEach((arrow, index) => {
        arrow.update();
        arrow.draw();

        // Check if arrow hits any target
        targets.forEach((target, targetIndex) => {
            if (target.isHit(arrow)) {
                target.hit = true;
                score += 10;
                health -= 10;
                arrows.splice(index, 1); // Remove arrow
                if (health <= 0) {
                    alert('Game Over');
                    document.location.reload();
                }
                updateUI();
            }
        });

        // Remove arrow if out of canvas
        if (arrow.x < 0 || arrow.x > canvas.width || arrow.y < 0 || arrow.y > canvas.height) {
            arrows.splice(index, 1);
        }
    });

    // Draw targets
    targets.forEach(target => target.draw());

    requestAnimationFrame(gameLoop);
}

// Shoot an arrow
function shootArrow(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
    const speed = 5;
    arrows.push(new Arrow(canvas.width / 2, canvas.height / 2, speed * Math.cos(angle), speed * Math.sin(angle)));
}

// Update score and health display
function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
    healthElement.textContent = `Health: ${health}`;
}

// Start the game
init();
