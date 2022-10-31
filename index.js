const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

class player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

    }

    moveLeft() {
        this.x -= 10;

    }
    moveRight() {
        this.x += 10;

    }
    moveUp() {
        this.y -= 10;

    }
    moveDown() {
        this.y += 10;
    }
    draw() {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
    collisionCheck(obstacle) {
        if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.height + this.y > obstacle.y
        ) {
            // Collision detected!
            //console.log(detected)
            return true

        } else {
            // No collision
            return false
        }
    }
}

class obstacle extends player {

    moveDown() {
        this.y += 1
    }
}

let myPlayer = new player(325, 740, 50, 50, "orange");


window.addEventListener("keydown", function (e) {

    switch (e.code) {
        case 'ArrowLeft':
            myPlayer.moveLeft();
            break;
        case 'ArrowRight':
            myPlayer.moveRight();
            break;
        case "ArrowUp":
            myPlayer.moveUp();
            break;
        case "ArrowDown":
            myPlayer.moveDown();
            break;
    }

})


let intervalID;
let score = 0;
let fallingObstaclesArr = [];
let frameCount = 0;

// const fallingObsticles = new obstacle(0, 0, 100, 80, "black")
// fallingObsticles.draw();



const animationLoop = function () {


    frameCount++;

    if (frameCount % 180 == 0) {
        const fallingObstacles = new obstacle(0, 0, 180, 80, "yellow");
        const fallingObstacles2 = new obstacle(500, 0, 200, 80, "pink");
        const fallingObstacles3 = new obstacle(250, 0, 150, 80, "blue");

        fallingObstaclesArr.push(fallingObstacles);
        fallingObstaclesArr.push(fallingObstacles2);
        fallingObstaclesArr.push(fallingObstacles3);
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < fallingObstaclesArr.length; i++) {

        fallingObstaclesArr[i].draw()
        fallingObstaclesArr[i].moveDown();

        if (myPlayer.collisionCheck(fallingObstaclesArr[i])) {
            clearInterval(intervalID);

            // display game over and sad music.
            // score++ every time a new falling obstacle reaches the bottom 
        }


        myPlayer.draw();

    }

}

intervalID = setInterval(animationLoop, 16);