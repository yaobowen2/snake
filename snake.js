/**
 * 转向
 * 增长
 * 加速
 * 判断重合
 * 判断碰壁
 */
const INIT_LENGTH = 4;
const WIDTH = 50;

class Snake {
    constructor() {
        this.coordinates = [];
        this.headDirection = 0;
        this.footDirection = 0;
    }

    // move() {
    //     if (this.nextDirection === )
    //         switch (this.nextDirection) {
    //             case 0:
    //         }
    // }

    forward() {
        const coordinates = this.coordinates;
        const headPoint = coordinates[0];
        switch (this.headDirection) {
            case 0:
                headPoint.y--;
                break;
            case 1:
                headPoint.x++;
                break;
            case 2:
                headPoint.y++;
                break;
            case 3:
                headPoint.x--;
                break;
        }
        const footPoint = coordinates[coordinates.length - 1];
        switch (this.footDirection) {
            case 0:
                footPoint.y--;
                break;
            case 1:
                footPoint.x++;
                break;
            case 2:
                footPoint.y++;
                break;
            case 3:
                footPoint.x--;
                break;
        }
        if (coordinates.length > 2) {
            const { x, y } = coordinates[coordinates.length - 2];
            if (footPoint.x === x && footPoint.y === y) {
                coordinates.pop();
            }
        }
        this.render();
    }

    left() {

    }

    right() {

    }

    top() {

    }

    bottom() {

    }

    increaseLength() {

    }

    speedUp() {

    }

    render() {

    }

    start() {
        if (!this.coordinates.length) {
            this.coordinates.push({
                x: INIT_WIDTH,
                y: 0,
                direction: 1
            })
            this.coordinates.push({
                x: 0,
                y: 0,
                direction: 1
            })
        }
        this.render();
        this.timer = setInterval(() => {
            this.move();
        }, 1000)
        this.running = true;
        document.onclick = e => {
            if (this.running) {
                switch (e.keyCode) {
                    case 37: // ←
                        this.nextDirection = 3;
                        break;
                    case 38: // ↑
                        this.nextDirection = 0;
                        break;
                    case 39: // →
                        this.nextDirection = 1;
                        break;
                    case 40: // ↓
                        this.nextDirection = 2;
                        break;
                }
            }
        }
    }

    stop() {
        clearTimeout(this.timer);
        this.running = false;
    }

}

class Controller {

}
