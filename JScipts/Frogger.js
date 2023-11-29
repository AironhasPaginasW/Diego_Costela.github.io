document.addEventListener("DOMContentLoaded", function () {

    // Mostrar el modal al cargar la página
    openModal();

    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");
    const goal = document.getElementById("goal");
    const timerDisplay = document.getElementById("timer");
    let playerPositionX = 50;
    let playerPositionY = 10;
    let playerProgress = 0;
    let carSpeed1 = 2;
    let carSpeed2 = -1;
    let carSpeed3 = 1;
    let timer = 0;
    let timerInterval;
    console.log("Time: " + timer);
    

    let randomNumber = Math.random() * 11 - 5;
if (randomNumber === 0) {
    randomNumber = Math.random() * 11 - 5;
}
    let carSpeed = randomNumber 

    const cars = []; // Array para almacenar los coches.
    const carCountToAdd = 2; // Número de coches a añadir cada vez

    function update() {
        // Mover coches con velocidades variables
        moveCar(cars[0], carSpeed1);
        moveCar(cars[1], carSpeed2);
        moveCar(cars[2], carSpeed3);
        moveCar(cars[playerProgress], carSpeed)

        // Comprobar colisiones
        if (checkCarCollision()) {
            stopTimer();
            resetGame();
            
            return;
        }

        // Comprobar si el jugador alcanzó la meta
        if (checkCollision(player, goal)) {
            alert("¡Has llegado a la meta, sigue así!");
            increaseSpeed();
            playerPositionX = 50;
            playerPositionY = 10;
            playerProgress ++;
            if (playerProgress % 2 === 0) {
                addCars(carCountToAdd); // Añadir coches cada nivel
            }
        }

        // Actualizar posición del jugador
        player.style.left = playerPositionX + "px";
        player.style.bottom = playerPositionY + "px";

        // Llamar a la función de actualización nuevamente
        requestAnimationFrame(update);
    }

    function moveCar(car, speed) {
        car.style.left = (parseInt(car.style.left) + speed) + "px";

        // Restablecer la posición del coche cuando se sale de los límites
        if (speed > 0 && parseInt(car.style.left) > gameContainer.clientWidth) {
            car.style.left = "-40px";
        } else if (speed < 0 && parseInt(car.style.left) < -40) {
            car.style.left = gameContainer.clientWidth + "px";
        }
    }

    function checkCollision(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    function checkCarCollision() {
        // Comprobar colisiones con todos los coches
        for (const car of cars) {
            if (checkCollision(player, car)) {
                return true;
            }
        }
        return false;
    }
    function updateLevelDisplay() {
        document.getElementById("level-display").textContent = "Level: " + (playerProgress + 1);
    }

    function resetGame() {
        alert("Game over!");
        playerPositionX = 50;
        playerPositionY = 10;
        player.style.left = "50%";
        player.style.bottom = "10px";
        playerProgress = 0;
    
        // Restablecer la posición de todos los coches y eliminarlos del array
        for (const car of cars) {
            //car.style.left = "-40px";
            gameContainer.removeChild(car);
            moveCar(car);
        }
    
        // Restablecer velocidades de los coches
        carSpeed1 = 2;
        carSpeed2 = -1;
        carSpeed3 = 1;
        let randomNumber = Math.random() * 11 - 5;
        if (randomNumber === 0) {
            randomNumber = Math.random() * 11 - 5;
        }
        carSpeed = randomNumber;
    
        cars.length = 3;
        addCars(3);
        updateLevelDisplay();
        startTimer();
    
        // Llamar a la función de actualización para reiniciar el bucle del juego
        update();
    }
    

    function increaseSpeed() {
        carSpeed1 += playerProgress * 0.4;
        carSpeed2 -= playerProgress * 0.3;
        carSpeed3 += playerProgress * 0.55;
        carSpeed -= playerProgress * 0.2;
        updateLevelDisplay();
    }

    function addCars(count) {
        // Añadir coches al array y al contenedor del juego
        for (let i = 0; i < count; i++) {
            const newCar = document.createElement("div");
            newCar.className = "car";
            newCar.style.width = "50px";
            newCar.style.height = "50px";
            newCar.style.top = Math.floor(Math.random() * gameContainer.clientHeight) + "px";
            newCar.style.left = "-40px";
            newCar.style.backgroundColor = "#f00";
            gameContainer.appendChild(newCar);
            cars.push(newCar);
        }
    }
    function startTimer() {
        timer = 0;
        timerInterval = setInterval(function () {
            timer++;
            timerDisplay.textContent = "Time: " + timer + "s";
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Escuchar eventos de teclas para el movimiento del jugador
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight" && playerPositionX < gameContainer.clientWidth - 40) {
            playerPositionX += 30;
        } else if (event.key === "ArrowLeft" && playerPositionX > 0) {
            playerPositionX -= 30;
        } else if (event.key === "ArrowUp" && playerPositionY < gameContainer.clientHeight - 40) {
            playerPositionY += 30;
        } else if (event.key === "ArrowDown" && playerPositionY > 0) {
            playerPositionY -= 30;
        }

        player.style.left = playerPositionX + "px";
        player.style.bottom = playerPositionY + "px";
    });

    // Añadir coches iniciales
    addCars(3); // Cambiado para añadir 3 coches iniciales

    // Iniciar el bucle del juego
    startTimer();
    update();
});

function openModal() {
    const modal = document.getElementById("rulesModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("rulesModal");
    modal.style.display = "none";
}
