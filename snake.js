const DISTANCE_STEP = 4;// 每帧走4px
const INIT_LENGTH = 4;// 初始长度是宽度的4倍
const WIDTH_SNAKE = 40;// 蛇粗40px
const WIDTH_SEED = WIDTH_SNAKE / 2;//种子是蛇粗的一半
const body = document.body;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class Snake {
    constructor({
        onfail,
        oneat,
        seed
    } = {}) {
        this.onfail = onfail;
        this.oneat = oneat;
        this.seed = seed || new Seed();
        this.parts = [];
        this.reset();
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
        let point_head = coordinates[0];
        const headDirection = point_head.direction;
        if (this.nextDirection === headDirection + 2 || this.nextDirection === headDirection - 2) {
            this.nextDirection = headDirection;
        }
        let nextDirection = this.nextDirection;
        if (nextDirection !== headDirection) {
            if (Math.abs(point_head.x - coordinates[1].x) + Math.abs(point_head.y - coordinates[1].y) < WIDTH_SNAKE) {
                nextDirection = headDirection;
            } else {
                point_head = {
                    x: point_head.x,
                    y: point_head.y,
                    direction: nextDirection
                }
                coordinates.unshift(point_head);
            }
        }
        switch (nextDirection) {
            case 0:
                point_head.y -= DISTANCE_STEP;
                break;
            case 1:
                point_head.x += DISTANCE_STEP;
                break;
            case 2:
                point_head.y += DISTANCE_STEP;
                break;
            case 3:
                point_head.x -= DISTANCE_STEP;
                break;
        }

        const { x, y } = point_head;
        if (x < 0 || y < 0 || x > windowWidth || y > windowHeight) {
            this.stop();
            this.onfail && this.onfail();
            return;
        }

        const len = coordinates.length;
        const point_foot = coordinates[len - 1];
        const point_lastSecond = coordinates[len - 2];
        switch (point_lastSecond.direction) {
            case 0:
                point_foot.y -= DISTANCE_STEP;
                break;
            case 1:
                point_foot.x += DISTANCE_STEP;
                break;
            case 2:
                point_foot.y += DISTANCE_STEP;
                break;
            case 3:
                point_foot.x -= DISTANCE_STEP;
                break;
        }
        if (coordinates.length > 2) {
            if (point_foot.x === point_lastSecond.x && point_foot.y === point_lastSecond.y) {
                coordinates.pop();
            }
        }

        const { x: x2, y: y2 } = this.seed.getCoordinate();
        const _x = x + WIDTH_SNAKE / 2 - x2;
        const _y = y + WIDTH_SNAKE / 2 - y2;
        if (_x * _x + _y * _y < WIDTH_SEED * WIDTH_SEED / 2) {
            this.seed.toggleLocation();
            this.grow();
            this.oneat && this.oneat();
        }
        this.render();
    }

    grow() {
        const coordinates = this.coordinates;
        const len = coordinates.length;
        const point_foot = coordinates[len - 1];
        const point_lastSecond = coordinates[len - 2];
        switch (point_lastSecond.direction) {
            case 0:
                point_foot.y += WIDTH_SNAKE;
                break;
            case 1:
                point_foot.x -= WIDTH_SNAKE;
                break;
            case 2:
                point_foot.y -= WIDTH_SNAKE;
                break;
            case 3:
                point_foot.x += WIDTH_SNAKE;
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
                width = WIDTH_SNAKE + 'px';
                height = Math.abs(c1.y - c2.y) + WIDTH_SNAKE + 'px';
            } else {
                width = Math.abs(c1.x - c2.x) + WIDTH_SNAKE + 'px';
                height = WIDTH_SNAKE + 'px';
            }
            part.style.cssText = `display:block;left:${left};top:${top};width:${width};height:${height}`;
            body.appendChild(part);
        })
        parts.slice(this.coordinates.length - 1).forEach(part => part.style.display = 'none');
    }

    run() {
        if (!this.running) {
            this.render();
            if (!this.seed.dom) {
                this.seed.toggleLocation();
            }
            const step = () => {
                this.step();
                if (this.running) {
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
            this.running = true;
        }
    }

    stop() {
        this.running = false;
        this.reset();
    }

    isRunning() {
        return this.running;
    }

    reset() {
        this.coordinates = [{
            x: WIDTH_SNAKE * (INIT_LENGTH - 1),
            y: 0,
            direction: 1
        }, {
            x: 0,
            y: 0
        }];
        this.nextDirection = 1;
    }
}

class Seed {

    toggleLocation() {
        const x = this.x = Math.floor(Math.random() * windowWidth);
        const y = this.y = Math.floor(Math.random() * windowHeight);
        const style = `width:${WIDTH_SEED}px;height:${WIDTH_SEED}px;left:${x}px;top:${y}px`;
        let dom = this.dom;
        if (dom) {
            dom.style.cssText = style;
        } else {
            dom = this.dom = document.createElement('div');
            dom.className = 'seed';
            dom.style.cssText = style;
            body.appendChild(dom);
        }
    }

    getCoordinate() {
        return {
            x: this.x,
            y: this.y
        }
    }
}