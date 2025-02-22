class BallSystem {
    constructor() {
        this.container = document.getElementById('ballContainer');
        this.maxBalls = 2000; // Increased maximum capacity
        this.init();
    }

    init() {
        // Create initial 300 balls
        for(let i = 0; i < 300; i++) {
            this.createBall();
        }
    }

    createBall(x = Math.random() * 100, y = Math.random() * 100) {
        if(this.container.children.length >= this.maxBalls) return;
        
        const ball = document.createElement('div');
        ball.className = 'ball';
        
        const hue = Math.random() * 360;
        const size = Math.random() * 0.6 + 0.7;
        
        // Generate bounded trajectory points
        const safeTranslate = (pos, maxOffset = 25) => {
            const max = 100 - pos;
            const min = -pos;
            return Math.random() * (max - min) + min;
        };

        const tx1 = 0;
        const ty1 = 0;
        const tx2 = safeTranslate(x);
        const ty2 = safeTranslate(y);
        const tx3 = safeTranslate(x);
        const ty3 = safeTranslate(y);
        const tx4 = safeTranslate(x);
        const ty4 = safeTranslate(y);

        ball.style.cssText = `
            --tx-1: ${tx1};
            --ty-1: ${ty1};
            --tx-2: ${tx2};
            --ty-2: ${ty2};
            --tx-3: ${tx3};
            --ty-3: ${ty3};
            --tx-4: ${tx4};
            --ty-4: ${ty4};
            left: ${x}vw;
            top: ${y}vh;
            background: hsl(${hue}, 85%, 65%);
            box-shadow: 0 0 20px hsl(${hue}, 85%, 65%);
            width: calc(var(--ball-size) * ${size});
            height: calc(var(--ball-size) * ${size});
            animation-duration: ${Math.random() * 20 + 25}s;
        `;

        ball.addEventListener('click', (e) => {
            this.generateExplosion(x, y, hue);
            e.stopPropagation();
        });

        this.container.appendChild(ball);
    }

    generateExplosion(x, y, hue) {
        // Create 10-15 new balls per click
        for(let i = 0; i < 10 + Math.floor(Math.random() * 6); i++) {
            const angle = (Math.PI * 2) * (i / (10 + Math.random() * 5));
            const newX = Math.min(99, Math.max(1, x + Math.cos(angle) * 5));
            const newY = Math.min(99, Math.max(1, y + Math.sin(angle) * 5));
            this.createBall(newX, newY);
        }
    }
}

new BallSystem();
