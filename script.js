//4.03.24 start spill
document.addEventListener('DOMContentLoaded', function() {
    const car = document.getElementById('car');
    let carPosition = window.innerWidth / 2 - 25; // Initial position

    function moveCar(event) {
        if (event.key === "ArrowLeft") {
            carPosition -= 10;
        } else if (event.key === "ArrowRight") {
            carPosition += 10;
        }
        car.style.left = carPosition + 'px';
    }

    document.addEventListener('keydown', moveCar);
});
