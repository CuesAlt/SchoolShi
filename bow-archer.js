const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let score = 0;
let playerHealth = 100;
let targets = [];
let arrows = [];
let enemyArrows = [];
let pulling = false;
let pullStartX = 0;
let pullBackDistance = 0;
let player = { x: 100, y: canvas.height - 150, width: 50, height: 100 };

// Utility function to get random positions for targets
function getRandomPosition() {
    const x = Math.random() * (canvas.width - 100) + 200;
    const y = canvas.height - 150;
    return { x, y };
}

// Target class
class Target {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.health = 100;
        this.healthBar = { x: this.x, y: this.y - 20, width: this.width, height: 10 };
        this.lastShootTime = Date.now();
    }

    draw() {
        // Draw stick figure target
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + this.width / 4, this.y - 20, this.width / 2, 20); // head

        // Draw health bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.healthBar.x, this.healthBar.y, this.healthBar.width, this.healthBar.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.healthBar.x, this.healthBar.y, this.healthBar.width * (this.health / 100), this.healthBar.height);
    }

    shoot() {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const speed = 3;
        enemyArrows.push(new Arrow(this.x, this.y + this.height / 2, speed * Math.cos(angle), speed * Math.sin(angle)));
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

// Draw player on a platform
function drawPlayer() {
    // Platform under player
    ctx.fillStyle = '#6B8E23';
    ctx.fillRect(player.x, player.y + player.height, 100, 10);
    
    // Player stick figure
    ctx.fillStyle = 'brown';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x + player.width / 4, player.y - 20, player.width / 2, 20); // head

    // Bow
    ctx.strokeStyle = 'saddlebrown';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width, player.y + player.height / 2);
    ctx.lineTo(player.x + player.width + 50, player.y + player.height / 2);
    ctx.stroke();
}

// Initialize the game
function init() {
    const { x, y } = getRandomPosition();
    targets.push(new Target(x, y));
    document.addEventListener('mousedown', startPulling);
    document.addEventListener('mouseup', shootArrow);
    gameLoop();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    targets.forEach(target => target.draw());
    arrows.forEach((arrow, index) => {
        arrow.update();
        arrow.draw();

        // Check if the arrow hits the target
        targets.forEach((target, targetIndex) => {
            if (target.isHit(arrow)) {
                target.health -= 20;
                if (target.health <= 0) {
                    score += 10;
                    targets.splice(targetIndex, 1);
                }
                arrows.splice(index, 1);
                updateUI();
            }
        });
    });
    requestAnimationFrame(gameLoop);
}

// Start pulling the bow
function startPulling(event) {
    pulling = true;
    pullStartX = event.clientX;
}

// Shoot an arrow
function shootArrow(event) {
    if (pulling) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const angle = Math.atan2(y - player.y, x - player.x);
        const speed = 10;
        arrows.push(new Arrow(player.x + player.width, player.y + player.height / 2, speed * Math.cos(angle), speed * Math.sin(angle)));
        pulling = false;
    }
}

// Update score and health UI
function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
}

// Restart button logic
restartButton.addEventListener('click', function () {
    score = 0;
    playerHealth = 100;
    targets = [];
    arrows = [];
    init();
    updateUI();
});

// Start the game
init();
