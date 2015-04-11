// Set Up the Canvas

var canvas = document.createElement('canvas');
var content = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Set the score to 0

var score = 0;

// create the snake

var snake = {};

// create the apple




// Every 1000 milliseconds {
// 	clear the Canvas
// 	draw current score on screen
// 	move snake in current direction

// 	if (snake collides with wall or itself) {
// 		end the game
// 	} else if (snake eats an apple){
// 		add one to score
// 		move apple to new location
// 		make snake longer
// 	}
// 	For (each segment of the snake) {
// 		draw the segment
// 	}
// 	draw apple
// 	draw border
// }

// When the user presses a key {
// 	if (the key is an arrow)
// }
// }

