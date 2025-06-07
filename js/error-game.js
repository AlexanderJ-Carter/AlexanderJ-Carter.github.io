// 游戏变量初始化
let gameStarted = false;
let gameActive = false;
let score = 0;
let ballX, ballY, ballSpeedX, ballSpeedY;
let paddleX, paddleWidth;
let gameWidth, gameHeight;
let bricks = [];
let requestId;
let isTouchDevice = false;

// DOM元素
let gameContainer, ball, paddle, gameScore, gameMessage;
let playButton, gameControls;

// 初始化事件监听器
document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素引用
    gameContainer = document.getElementById('gameContainer');
    ball = document.getElementById('ball');
    paddle = document.getElementById('paddle');
    gameScore = document.getElementById('gameScore');
    gameMessage = document.getElementById('gameMessage');
    playButton = document.getElementById('playButton');
    gameControls = document.getElementById('gameControls');

    // 检测是否为触摸设备
    isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

    // 为开始游戏按钮添加点击事件
    playButton.addEventListener('click', startGame);

    // 为重新开始按钮添加点击事件
    document
        .getElementById('restartButton')
        .addEventListener('click', resetGame);

    // 添加游戏说明文本，根据设备类型显示不同内容
    const gameInstructions = document.querySelector('.game-instructions');
    if (gameInstructions) {
        if (isTouchDevice) {
            gameInstructions.textContent = '触摸屏幕左右滑动控制挡板';
        } else {
            gameInstructions.textContent = '使用左右方向键或鼠标移动挡板';
        }
    }
});

// 开始游戏函数
function startGame() {
    if (gameStarted) return;

    gameContainer.style.display = 'block';
    gameControls.style.display = 'block';
    playButton.style.display = 'none';

    // 设置游戏区域尺寸
    gameWidth = gameContainer.offsetWidth;
    gameHeight = gameContainer.offsetHeight;

    // 初始化挡板
    paddleWidth = paddle.offsetWidth;
    paddleX = (gameWidth - paddleWidth) / 2; // 初始化球
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = 2;
    ballSpeedY = -2;

    // 设置球的初始位置
    ball.style.left = ballX - 7.5 + 'px';
    ball.style.top = ballY - 7.5 + 'px';

    // 创建砖块
    createBricks();

    // 添加事件监听器
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    gameContainer.addEventListener('mousemove', mouseMoveHandler);

    // 添加触摸事件支持
    if (isTouchDevice) {
        gameContainer.addEventListener('touchmove', touchMoveHandler, {
            passive: false,
        });
        gameContainer.addEventListener('touchstart', touchStartHandler, {
            passive: false,
        });
    }

    gameStarted = true;
    gameActive = true;
    score = 0;
    updateScore();

    // 开始游戏循环
    if (requestId) {
        cancelAnimationFrame(requestId);
    }

    gameLoop();
}

// 创建砖块函数
function createBricks() {
    bricks = [];
    const brickWidth = Math.min(50, Math.floor(gameWidth / 6)); // 自适应宽度
    const brickHeight = 20;
    const brickPadding = Math.min(10, Math.floor(gameWidth / 30)); // 自适应间距
    const brickOffsetTop = 30;
    const brickOffsetLeft = Math.max(
        15,
        Math.floor((gameWidth - (brickWidth + brickPadding) * 5) / 2)
    ); // 居中对齐
    const brickRows = 3;
    const brickColumns = 5;

    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#4D96FF', '#9D65C9'];

    for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickColumns; c++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

            // 创建砖块元素
            const brick = document.createElement('div');
            brick.className = 'brick';
            brick.style.left = brickX + 'px';
            brick.style.top = brickY + 'px';
            brick.style.width = brickWidth + 'px';
            brick.style.height = brickHeight + 'px';
            brick.style.backgroundColor = colors[c % colors.length];
            gameContainer.appendChild(brick);

            bricks.push({
                x: brickX,
                y: brickY,
                width: brickWidth,
                height: brickHeight,
                element: brick,
                visible: true,
            });
        }
    }
}

// 键盘控制
let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
        e.preventDefault(); // 防止页面滚动
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
        e.preventDefault(); // 防止页面滚动
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// 鼠标控制
function mouseMoveHandler(e) {
    const relativeX = e.clientX - gameContainer.getBoundingClientRect().left;

    if (relativeX > 0 && relativeX < gameWidth) {
        paddleX = relativeX - paddleWidth / 2;

        if (paddleX < 0) {
            paddleX = 0;
        } else if (paddleX > gameWidth - paddleWidth) {
            paddleX = gameWidth - paddleWidth;
        }
    }
}

// 触摸控制 - 新增
let lastTouchX = 0;

function touchStartHandler(e) {
    if (e.touches.length > 0) {
        lastTouchX = e.touches[0].clientX;
        e.preventDefault(); // 防止页面滚动
    }
}

function touchMoveHandler(e) {
    if (e.touches.length > 0) {
        e.preventDefault(); // 防止页面滚动

        const touchX = e.touches[0].clientX;
        const moveDiff = touchX - lastTouchX;
        lastTouchX = touchX;

        paddleX += moveDiff;

        if (paddleX < 0) {
            paddleX = 0;
        } else if (paddleX > gameWidth - paddleWidth) {
            paddleX = gameWidth - paddleWidth;
        }
    }
}

// 更新分数显示
function updateScore() {
    gameScore.textContent = `得分: ${score}`;
}

// 碰撞检测函数
function checkCollision() {
    const ballRadius = 7.5;

    // 球与墙壁碰撞
    if (
        ballX + ballSpeedX > gameWidth - ballRadius ||
        ballX + ballSpeedX < ballRadius
    ) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }

    // 球与挡板碰撞
    if (ballY + ballSpeedY > gameHeight - 30) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            // 根据球击中挡板的位置调整反弹角度
            const hitPoint =
                (ballX - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
            ballSpeedX = hitPoint * 3; // 最大速度为3
            ballSpeedY = -ballSpeedY;

            // 随机稍微调整球速来增加游戏变化
            ballSpeedX += (Math.random() - 0.5) * 0.5;

            // 随着游戏进行，逐渐增加难度
            if (score > 50) {
                ballSpeedY -= 0.1;
            }
        } else if (ballY > gameHeight - ballRadius) {
            // 球落地，游戏结束
            gameOver();
        }
    } // 球与砖块碰撞
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];

        if (brick.visible) {
            // 改进的碰撞检测，处理从四个方向碰撞的情况
            if (
                ballX > brick.x - ballRadius &&
                ballX < brick.x + brick.width + ballRadius &&
                ballY > brick.y - ballRadius &&
                ballY < brick.y + brick.height + ballRadius
            ) {
                // 确定从哪个方向碰撞
                const overlapLeft = ballX - (brick.x - ballRadius);
                const overlapRight = brick.x + brick.width + ballRadius - ballX;
                const overlapTop = ballY - (brick.y - ballRadius);
                const overlapBottom =
                    brick.y + brick.height + ballRadius - ballY;

                // 找出最小重叠方向
                const minOverlap = Math.min(
                    overlapLeft,
                    overlapRight,
                    overlapTop,
                    overlapBottom
                );

                // 根据碰撞方向反弹
                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    ballSpeedX = -ballSpeedX;
                } else {
                    ballSpeedY = -ballSpeedY;
                }

                brick.visible = false;
                brick.element.style.display = 'none';
                score += 10;
                updateScore();

                // 检查是否所有砖块都被消除
                const remainingBricks = bricks.filter((b) => b.visible).length;
                if (remainingBricks === 0) {
                    showMessage('恭喜，你赢了！');
                    gameActive = false;
                }

                // 一次只处理一个砖块碰撞
                break;
            }
        }
    }
}

// 游戏结束函数
function gameOver() {
    gameActive = false;
    showMessage('游戏结束');
}

// 显示消息函数
function showMessage(text) {
    gameMessage.textContent = text;
    gameMessage.style.display = 'block';
}

// 隐藏消息函数
function hideMessage() {
    gameMessage.style.display = 'none';
}

// 重置游戏函数
function resetGame() {
    // 重置球和挡板位置
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = 2;
    ballSpeedY = -2;
    paddleX = (gameWidth - paddleWidth) / 2;

    // 移除现有砖块
    bricks.forEach((brick) => {
        if (brick.element && brick.element.parentNode) {
            brick.element.parentNode.removeChild(brick.element);
        }
    });

    // 创建新砖块
    createBricks();

    // 重置分数
    score = 0;
    updateScore();

    // 隐藏消息
    hideMessage();

    // 重新开始游戏
    gameActive = true;

    if (requestId) {
        cancelAnimationFrame(requestId);
    }

    gameLoop();
}

// 游戏主循环
function gameLoop() {
    if (!gameActive) return;

    // 更新球的位置
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 更新挡板位置（键盘控制）
    if (rightPressed && paddleX < gameWidth - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // 确保挡板不会超出边界
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX > gameWidth - paddleWidth) {
        paddleX = gameWidth - paddleWidth;
    }

    // 检查碰撞
    checkCollision();

    // 渲染游戏元素
    ball.style.left = ballX - 7.5 + 'px'; // 球的半径是7.5px
    ball.style.top = ballY - 7.5 + 'px';
    paddle.style.left = paddleX + 'px';

    // 继续游戏循环
    if (gameActive) {
        requestId = requestAnimationFrame(gameLoop);
    }
}

// 处理窗口大小变化
window.addEventListener('resize', function () {
    if (gameStarted) {
        // 保存当前游戏状态
        const wasActive = gameActive;
        gameActive = false;

        // 重新计算游戏尺寸
        gameWidth = gameContainer.offsetWidth;
        gameHeight = gameContainer.offsetHeight;

        // 移除现有砖块
        bricks.forEach((brick) => {
            if (brick.element && brick.element.parentNode) {
                brick.element.parentNode.removeChild(brick.element);
            }
        });

        // 重新创建砖块
        createBricks();

        // 调整球和挡板位置
        ballX = Math.min(ballX, gameWidth - 8);
        ballY = Math.min(ballY, gameHeight - 8);
        paddleX = Math.min(paddleX, gameWidth - paddleWidth);

        // 恢复游戏状态
        if (wasActive) {
            gameActive = true;
            gameLoop();
        }
    }
});
