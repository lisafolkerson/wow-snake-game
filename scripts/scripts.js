// Set Up the Canvas

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var width = canvas.width;
var height = canvas.height;


var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// create the snake

var snake = {};

// draw the border 
var border = function() {
	context.fillStyle = "Gray";
	context.fillRect(0,0,width,blockSize);
	context.fillRect(0,0,blockSize,height);
	context.fillRect(0,height-blockSize,width,blockSize);
	context.fillRect(width-blockSize, 0, blockSize, height);
}

border();

//display the score
// Set the score to 0
var score = 0;
var displayScore = function(){
	context.fillStyle = "rgb(0,0,0)";
	context.font = "18px Courier";
	context.textBaseline = 'top';
	context.fillText('The score is: ' + score, blockSize*2, blockSize*2);
};

displayScore();

// create the apple



// var interval = setInterval(function(){

// }, 1000);

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

