const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const clickAudio = new Audio('./click.mp3')
const gameOverAudio = new Audio('./Game-over.mp3')
const winAudio = new Audio('./Celebration.mp3')
const soundTrack = new Audio('./soundtrack1.mp3')

let intervalID;
let fallingObstaclesArr = [];
let frameCount = 0;
let game = false

let scoreElement = document.getElementById("score")
let loseElement = document.querySelector("#loser")
let winElement = document.querySelector("#winner")

let score = 0

let start = () => {
    if (game === false){
        game = true
    console.log("START CLICKED")
    loseElement.style.visibility = "hidden"
    winElement.style.visibility = "hidden"
    startButton.style.visibility = "hidden"
    clickAudio.play()

    intervalID = setInterval(animationLoop, 16);}
}

let startButton = document.getElementById('start-button')
startButton.addEventListener('click', start)

let playerImg = new Image();
playerImg.src = "./UFO-scare.png"

let meteorito = new Image();
meteorito.src = "./meteorito.png"

class player {
    constructor(x, y, width, height, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.image = image
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
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);

    }
    collisionCheck(obstacle) {
        if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.height + this.y > obstacle.y
        ) {
            // Collision detected!

            return true

        } else {

            return false
        }
    }
}

class obstacle extends player {
    moveDown() {
        this.y += 5
    }
}

let myPlayer = new player(325, 740, 130, 120, playerImg);
// let myPlayer = new player(325, 740, 50, 50, "orange");


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

let bounceCheck = () => {

    if (myPlayer.x >= canvas.width - myPlayer.width) {

        myPlayer.x = canvas.width - (myPlayer.width + 1);

    } else if (myPlayer.y >= canvas.height - myPlayer.height) {
        myPlayer.y = canvas.height - (myPlayer.height + 1);

    } else if (myPlayer.y < 0) {
        myPlayer.y = 0;
    } else if (myPlayer.x < 0) {
        myPlayer.x = 0;
    }

}





// let intervalID;
// let fallingObstaclesArr = [];
// let frameCount = 0;




const animationLoop = function () {
    console.log("ANIMATING")

    soundTrack.play()

    frameCount++;

    if (frameCount % 120 == 0) {

        // do this if you want to get random sizes of the falling obstacle but since is an image leave one specific size. 
        // let randomWidth = 100 * Math.random() + 100;
        // let randomHeight = 100 * Math.random() +100;
        let randomX = (700 - 140) * Math.random();

        const fallingObstacles = new obstacle(randomX, 0, 140, 150, meteorito);

        fallingObstaclesArr.push(fallingObstacles);
    }



    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < fallingObstaclesArr.length; i++) {

        fallingObstaclesArr[i].draw()
        fallingObstaclesArr[i].moveDown();

        if (myPlayer.collisionCheck(fallingObstaclesArr[i])) {
            clearInterval(intervalID);
            game = false
            fallingObstaclesArr = []
            score = 0

            loseElement.style.visibility = "visible"
            gameOverAudio.play()
            startButton.style.visibility = "visible"
            //let intervalID;
            // let frameCount = 0

        }


        if (fallingObstaclesArr[i].y >= canvas.height) {
            score += 1;
            scoreElement.innerText = `${score}`;
            fallingObstaclesArr.shift()
        }

        if (score === 10) {
            score = 0
            clearInterval(intervalID);
            winElement.style.visibility = "visible"
            game = false
            fallingObstaclesArr = []
            // document.querySelector(".winner.hidden").classList.remove('hidden')
            winAudio.play()
            startButton.style.visibility = "visible"

        }



        myPlayer.draw();

    }

    bounceCheck()

}

// intervalID = setInterval(animationLoop, 16);