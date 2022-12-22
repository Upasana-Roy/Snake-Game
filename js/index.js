//Game Constants & variables
let direction = {x:0, y:0}; //initially at stop
const foodSound = new Audio('Food.wav');
const gameoverSound = new Audio('GameOver.wav');
const moveSound = new Audio('Move.wav');
const musicSound = new Audio('BackgroundMusic.wav');
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15} //snake head at (13,15)
]

//Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main); //main fn becomes game loop
    console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)  //if it is less than 0.5 don't paint the screen.
        return;
    lastPaintTime = ctime;
    gameEngine();
}
 function gameEngine() {
    //Part 1: updating the snake array (for body parts) & Food
    //Part 2: Display snake & food (as a HTML element)

 }











//Main logic starts here
//to render animation (game loop)
window.requestAnimationFrame(main)