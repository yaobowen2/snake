const INIT_LENGTH = 4;
const WIDTH = 50;

class Snake {
    constructor() {
        this.coordinates = [{
            x: INIT_WIDTH,
            y: 0,
            direction: 1
        }, {
            x: 0,
            y: 0
        }];
        this.parts = [];
        this.nextDirection = 1;
    }

    step() {
        const coordinates = this.coordinates;
        const headPoint = coordinates[0];
        const headDirection = headPoint.direction;
        if (this.nextDirection === headDirection + 2 || this.nextDirection === headDirection - 2) {
            this.nextDirection = headDirection;
        }
        switch (this.nextDirection) {
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
        const len = coordinates.length;
        const footPoint = coordinates[len - 1];
        const lastSecondPoint = coordinates[len - 2];
        switch (lastSecondPoint.direction) {
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
                footPoint.y++;
            case 1:
                footPoint.x--;
            case 2:
                footPoint.y--;
            case 3:
                footPoint.x++;
        }
        this.render();
    }

    render() {
        const parts = this.parts;
        this.coordinates.forEach((c1, i, coordinates) => {
            if (i !== 0 && i !== coordinates.length - 2) {
                return;
            }
            const c2 = coordinates[i + i];
            let part = parts[i];
            if (!part) {
                part = parts[i] = document.createElement('div');
                part.className = 'snake-part';
            }
            const style = parts[i].style;
            style.left = Math.min(c1.x, c2.x);
            style.top = Math.min(c1.y, c2.y);
            if (c1.x === c2.x) {
                style.width = WIDTH + 'px';
                style.height = Math.abs(c1.y - c2.y) * WIDTH + 'px';
            } else {
                style.width = Math.abs(c1.x - c2.x) * WIDTH + 'px';
                style.height = WIDTH + 'px';
            }
            style.display = 'block';
        })
        parts.slice(this.coordinates.length).forEach(part => part.style.display = 'none');
    }

    start() {
        this.render();
        this.timer = setInterval(() => {
            this.step();
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