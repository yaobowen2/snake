const INIT_LENGTH = 4;
const WIDTH = 50;

class Snake {
    constructor() {
        this.coordinates = [];
    }

    forward() {
        const coordinates = this.coordinates;
        const headPoint = coordinates[0];
        if (headPoint.x > coordinates[1]) {
            headPoint.x++;
        } else {
            headPoint
        }
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
                y: 0
            })
            this.coordinates.push({
                x: 0,
                y: 0
            })
        }
        this.render();
    }

    stop() {

    }
}

class Controller {

}