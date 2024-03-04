document.addEventListener('DOMContentLoaded', function() {
    const car = document.getElementById('car');
    const gameContainer = document.getElementById('gameContainer');
    let carPosition = gameContainer.offsetWidth / 2 - car.offsetWidth / 2; // Center the car

    function moveCar(event) {
        const moveAmount = 10;
        if (event.key === "ArrowLeft") {
            carPosition = Math.max(0, carPosition - moveAmount); // Prevent moving beyond left edge
        } else if (event.key === "ArrowRight") {
            carPosition = Math.min(gameContainer.offsetWidth - car.offsetWidth, carPosition + moveAmount); // Prevent moving beyond right edge
        }
        car.style.left = carPosition + 'px';
    }

    document.addEventListener('keydown', moveCar);
});
