//add speed levels : easy medium hard
//add high score feature

//Game Constants & variables
let inputDir = {x:0, y:0}; //initially at stop
const foodSound = new Audio('music/Food.wav');
const gameoverSound = new Audio('music/GameOver.wav');
const moveSound = new Audio('music/Move.mp3');
const musicSound = new Audio('music/BackgroundMusic.wav');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15} //snake head at (13,15). origin at top left corner in js.
]
food = {x: 6, y: 7};

//Game Functions
function main(ctime) //ctime : sends the current time
{
    window.requestAnimationFrame(main); //main fn becomes game loop, calls main again & again
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)  //if it is less than 0.5 don't paint the screen.
        return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if snake collides into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    //if collides with boundary
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
        return true;
    
}

 function gameEngine() {
    //Part 1: updating the snake array (for body parts) & Food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0,y: 0};
        alert("Game over. Press any key to start again.");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food increment the score & regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} //generates a random INTEGER between a and b
    }

    //Moving the Snake
    for (let i = snakeArr.length -2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};       
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    //Part 2: Display snake & food (as a HTML element)
    //Displaying the snake
    board.innerHTML = ""  //emptying the board else multiple snakes created.
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Displaying the food(food is a single particle not an array)
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


 }



//Main logic starts here
//to render animation (game loop)
let hiscore = localStorage.getItem("hiscore");

if(hiscore === null){
    highScoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(hiscore);
    highScoreBox.innerHTML = "High Score: " + highScoreVal;
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir = {x: 0,y: 1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})
