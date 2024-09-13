const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');

let score = 0;
let health = 100;
let targets = [];
let arrows = [];
let player = { x: 100, y: canvas.height / 2, width: 50, height: 100 };

// Target class
class Target {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.health = 100;
    }

    draw() {
        // Draw stick figure as target
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + this.width / 4, this.y - 20, this.width / 2, 20); // head
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + this.height / 2, 10, this.height / 2); // body
    }

    isHit(arrow) {
        return arrow.x > this.x && arrow.x < this.x + this.width && arrow.y > this.y && arrow.y < this.y + this.height;
    }
}

// Arrow class
class Arrow {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = 5;
        this.height = 20;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.width / 2, this.y - this.height);
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.closePath();
    }
}

// Draw player with bow
function drawPlayer() {
    // Draw stick figure
    ctx.fillStyle = 'brown';
    ctx.fillRect(player.x, player.y, player.width, player.height); // body
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x + player.width / 4, player.y - 20, player.width / 2, 20); // head
    ctx.fillRect(player.x + player.width / 2 - 5, player.y + player.height / 2, 10, player.height / 2); // legs

    // Draw bow
    ctx.strokeStyle = 'saddlebrown';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width, player.y + player.height / 2);
    ctx.lineTo(player.x + player.width + 50, player.y + player.height / 2);
    ctx.stroke();

    // Draw string
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width + 50, player.y + player.height / 2 - 20);
    ctx.lineTo(player.x + player.width + 50, player.y + player.height / 2 + 20);
    ctx.stroke();
}

// Initialize game
function init() {
    targets.push(new Target(600, 250));
    targets.push(new Target(300, 300));
    document.addEventListener('click', shootArrow);
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player with bow
    drawPlayer();

    // Update and draw arrows
    arrows.forEach((arrow, index) => {
        arrow.update();
        arrow.draw();

        // Check if arrow hits any target
        targets.forEach((target, targetIndex) => {
            if (target.isHit(arrow)) {
                target.health -= 20;
                if (target.health <= 0) {
                    targets.splice(targetIndex, 1);
                    score += 10;
                }
                arrows.splice(index, 1); // Remove arrow
                health -= 10;
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
    const angle = Math.atan2(y - player.y, x - player.x);
    const speed = 5;
    arrows.push(new Arrow(player.x + player.width, player.y + player.height / 2, speed * Math.cos(angle), speed * Math.sin(angle)));
}

// Update score and health display
function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
    healthElement.textContent = `Health: ${health}`;
}

// Start the game
init();
