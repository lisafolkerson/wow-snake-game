<<<<<<< HEAD
/// Set Up the Canvas

var canvas = document.createElement('canvas');
var content = canvas.getContext('2d');
=======
// Set Up the Canvas

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
>>>>>>> 5c8ba0e03c8d87700954cb9228101e9109a1e268
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

<<<<<<< HEAD
// Set the score to 0

var score = 0;

// create the snake

var snake = {};

// create the apple
=======
var width = canvas.width;
var height = canvas.height;


var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// create the snake
>>>>>>> 5c8ba0e03c8d87700954cb9228101e9109a1e268

var snake = {};

<<<<<<< HEAD

=======
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
	context.fillText('Your score is: ' + score, blockSize*2, blockSize*2);
};

displayScore();

// create GameOver Suckaaaa text
var gameOver = function() {
	// clearInterval(interval);
	context.font = "60px Courier";
	context.fillStyle = "rgb(0,0,0)";
	context.textAlign = "center";
	context.textBaseline = "middle"
	context.fillText("GAME OVER FOOL!", canvas.width/2, canvas.height/2);
}

gameOver();

//CREATE BLOCK CONSTRUCTOR
var block = function(col, row) {
	this.col = col;
	this.row = row;
};

block.prototype.drawSquare = function(color) {
	var x = this.col * blockSize;
	var y = this.row * blockSize;
	context.fillStyle = color;
	context.fillRect(x,y,blockSize,blockSize);
};

var sampleBlock = new block(3,4);
sampleBlock.drawSquare('lightblue');

// create the apple

block.prototype.drawCircle = function(color) {
	var centerX = this.col * blockSize + blockSize / 2;
	var centerY = this.row * blockSize + blockSize / 2;
	context.fillStyle = color;
	circle(centerX, centerY, blockSize / 2, true);
};

var sampleCircle = new block(4,3);
sampleCircle.drawCircle('chartreuse');


// var interval = setInterval(function(){

// }, 1000);
>>>>>>> 5c8ba0e03c8d87700954cb9228101e9109a1e268

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
