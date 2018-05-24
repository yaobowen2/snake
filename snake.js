const DISTANCE_STEP = 4;// 每帧走10px
const INIT_LENGTH = 4;// 初始长度是宽度的4倍
const WIDTH = 40;// 蛇粗40px
const body = document.body;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class Snake {
    constructor() {
        this.coordinates = [{
            x: WIDTH * (INIT_LENGTH - 1),
            y: 0,
            direction: 1
        }, {
            x: 0,
            y: 0
        }];
        this.parts = [];
        this.nextDirection = 1;
        document.addEventListener('keydown', e => {
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
        })
    }

    step() {
        const coordinates = this.coordinates;
        let headPoint = coordinates[0];
        const headDirection = headPoint.direction;
        if (this.nextDirection === headDirection + 2 || this.nextDirection === headDirection - 2) {
            this.nextDirection = headDirection;
        }
        if (this.nextDirection !== headDirection) {
            headPoint = {
                x: headPoint.x,
                y: headPoint.y,
                direction: this.nextDirection
            }
            coordinates.unshift(headPoint);
        }
        switch (this.nextDirection) {
            case 0:
                headPoint.y -= DISTANCE_STEP;
                break;
            case 1:
                headPoint.x += DISTANCE_STEP;
                break;
            case 2:
                headPoint.y += DISTANCE_STEP;
                break;
            case 3:
                headPoint.x -= DISTANCE_STEP;
                break;
        }
        const { x, y } = headPoint;
        if (x < 0 || y < 0 || x > windowWidth || y > windowHeight) {
            this.stop();
            this.onfail && this.onfail();
            return;
        }
        const len = coordinates.length;
        const footPoint = coordinates[len - 1];
        const lastSecondPoint = coordinates[len - 2];
        switch (lastSecondPoint.direction) {
            case 0:
                footPoint.y -= DISTANCE_STEP;
                break;
            case 1:
                footPoint.x += DISTANCE_STEP;
                break;
            case 2:
                footPoint.y += DISTANCE_STEP;
                break;
            case 3:
                footPoint.x -= DISTANCE_STEP;
                break;
        }
        if (coordinates.length > 2) {
            if (footPoint.x === lastSecondPoint.x && footPoint.y === lastSecondPoint.y) {
                coordinates.pop();
            }
        }
        this.render();
    }

    increaseLength() {
        const coordinates = this.coordinates;
        const len = coordinates.length;
        const footPoint = coordinates[len - 1];
        const lastSecondPoint = coordinates[len - 2];
        switch (lastSecondPoint.direction) {
            case 0:
                footPoint.y += WIDTH;
                break;
            case 1:
                footPoint.x -= WIDTH;
                break;
            case 2:
                footPoint.y -= WIDTH;
                break;
            case 3:
                footPoint.x += WIDTH;
                break;
        }
    }

    render() {
        const parts = this.parts;
        const coordinates = this.coordinates;
        this.coordinates.forEach((c1, i, coordinates) => {
            const c2 = coordinates[i + 1];
            if (!c2) {
                return;
            }
            let part = parts[i];
            if (!part) {
                part = parts[i] = document.createElement('div');
                part.className = 'snake-part';
            }
            const left = Math.min(c1.x, c2.x) + 'px';
            const top = Math.min(c1.y, c2.y) + 'px';
            let width, height;
            if (c1.x === c2.x) {
                width = WIDTH + 'px';
                height = Math.abs(c1.y - c2.y) + WIDTH + 'px';
            } else {
                width = Math.abs(c1.x - c2.x) + WIDTH + 'px';
                height = WIDTH + 'px';
            }
            part.style.cssText = `display:block;left:${left};top:${top};width:${width};height:${height}`;
            body.appendChild(part);
        })
        parts.slice(this.coordinates.length - 1).forEach(part => part.style.display = 'none');
    }

    run() {
        this.render();
        const step = () => {
            this.step();
            if (this.running) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
        setInterval(this.increaseLength.bind(this), 1400)
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    isRunning() {
        return this.running;
    }
}

class Seed {

    show() {
        const x = this.x = Math.floor(Math.random() * windowWidth);
        const y = this.y = Math.floor(Math.random() * windowHeight);
        const style = `left:${x};top:${y}`
        let dom = this.dom;
        if (!dom) {
            dom = this.dom = document.createElement
        }
    }

    getCoordinate() {
        return {
            x: this.x,
            y: this.y
        }
    }
}