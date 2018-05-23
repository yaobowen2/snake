var snake = new Snake();
snake.onfail = () => alert('gg');
document.onkeydown = e => {
    if (e.keyCode === 32) {
        snake.isRunning() ? snake.stop() : snake.run();
    }
}