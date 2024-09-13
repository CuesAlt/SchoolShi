const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');

let score = 0;
let playerHealth = 100;
let targets = [];
let arrows = [];
let enemyArrows = [];
let player = { x: 100, y: canvas.height / 2, width: 50, height: 100 };
let pulling = false;
let pullStartX = 0;
let pullStartY = 0;
let pullStartTime = 0;
let shootCooldown = 0;
const enemyShootCooldown = 2000; // 2 seconds for enemies to shoot

// Utility function to generate random position
function getRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width - 50));
    const y = Math.floor(Math.random() * (canvas.height - 100));
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
        this.lastShootTime = Date.now();
        this.healthBar = { x: this.x, y: this.y - 20, width: this.width, height: 10 };
    }

    draw() {
        // Draw stick figure as target
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + this.width / 4, this.y - 20, this.width / 2, 20); // head
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + this.height / 2, 10, this.height / 2); // body

        // Draw health bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.healthBar.x, this.healthBar.y, this.healthBar.width, this.healthBar.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.healthBar.x, this.healthBar.y, this.healthBar.width * (this.health / 100), this.healthBar.height);
    }

    isHit(arrow) {
        return arrow.x > this.x && arrow.x < this.x + this.width && arrow.y > this.y && arrow.y < this.y + this.height;
    }

    shoot() {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const speed = 3;
        enemyArrows.push(new Arrow(this.x, this.y + this.height / 2, speed * Math.cos(angle), speed * Math.sin(angle)));
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
    for (let i = 0; i < 2; i++) {
        const { x, y } = getRandomPosition();
        targets.push(new Target(x, y));
    }
    document.addEventListener('mousedown', startPulling);
    document.addEventListener('mousemove', updatePulling);
    document.addEventListener('mouseup', shootArrow);
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
                target.healthBar.x = target.x;
                target.healthBar.y = target.y - 20;
                if (target.health <= 0) {
                    targets.splice(targetIndex, 1);
                    score += 10;
                    spawnNewTarget();
                }
                arrows.splice(index, 1); // Remove arrow
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

    // Update and draw enemy arrows
    enemyArrows.forEach((arrow, index) => {
        arrow.update();
        arrow.draw();

        // Check if enemy arrow hits the player
        if (arrow.x > player.x && arrow.x < player.x + player.width && arrow.y > player.y && arrow.y < player.y + player.height) {
            playerHealth -= 10;
            if (playerHealth <= 0) {
                alert('Game Over');
                score = 0; // Reset score
                document.location.reload();
            }
            enemyArrows.splice(index, 1); // Remove arrow
            updateUI();
        }

        // Remove arrow if out of canvas
        if (arrow.x < 0 || arrow.x > canvas.width || arrow.y < 0 || arrow.y > canvas.height) {
            enemyArrows.splice(index, 1);
        }
    });

    // Enemy shooting logic
    targets.forEach(target => {
        const currentTime = Date.now();
        if (currentTime - target.lastShootTime > enemyShootCooldown) {
            target.shoot();
            target.lastShootTime = currentTime;
        }
    });

    requestAnimationFrame(gameLoop);
}

// Spawn a new target at a random location
function spawnNewTarget() {
    const { x, y } = getRandomPosition();
    targets.push(new Target(x, y));
}

// Start pulling back the bow
function startPulling(event) {
    pulling = true;
    pullStartX = event.clientX;
    pullStartY = event.clientY;
    pullStartTime = Date.now();
}

// Update pulling state
function updatePulling(event) {
    if (pulling) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        pullBackDistance = Math.min(300, pullStartX - x); // Maximum pull back distance
    }
}

// Shoot an arrow
function shootArrow(event) {
    if (pulling) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const angle = Math.atan2(y - player.y, x - player.x);
        const pullDuration = Math.max(500, Date.now() - pullStartTime); // Minimum pull duration is 500ms
        const speed = Math.min(10, pullDuration / 50); // Speed depends on pull duration
        const distance = Math.max(50, pullBackDistance / 2); // Distance based on pull back
        arrows.push(new Arrow(player.x + player.width, player.y + player.height / 2, distance * Math.cos(angle), distance * Math.sin(angle)));
        pulling = false;
    }
}

// Update score and health display
function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
    healthElement.textContent = `Health: ${playerHealth}`;
}

// Start the game
init();
