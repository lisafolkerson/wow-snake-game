// Set Up the Canvas

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// create the apple

var width = canvas.width;
var height = canvas.height;


var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// draw the border 
var border = function() {
	context.fillStyle = "HotPink";
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

// var sampleBlock = new block(3,4);
// sampleBlock.drawSquare('lightblue');

// create the apple

block.prototype.drawCircle = function(color) {
	var centerX = this.col * blockSize + blockSize / 2;
	var centerY = this.row * blockSize + blockSize / 2;
	context.fillStyle = color;
	context.arc(centerX, centerY, blockSize / 2, 0, Math.PI*2, false);
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'limegreen';
	context.stroke();
};

var sampleCircle = new block(20,24);
sampleCircle.drawCircle("chartreuse");


block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
};

// var apple = new block (3,5);
// var head = new block (3,5);
// console.log(head.equal(apple));

// CREATE THE SNAKE
var Snake = function(){
	this.segments = [
		new block (7,5),
		new block (6,5),
		new block(5,5)
	];
	this.direction = 'right';
	this.nextDirection = 'right';
};

Snake.prototype.draw = function() {
	for (var i = 0; i < this.segments.length; i++) {
		this.segments[i].drawSquare('dodgerblue');
	}
};

var snake = new Snake();
snake.draw();

Snake.prototype.move = function() {
	var head = this.segments[0];
	var newHead;

	this.direction = this.nextDirection;

	if (this.direction === "right") {
		newHead = new block(head.col + 1, head.row);
	} 
	else if (this.direction === "down") {
		newHead = new block(head.col, head.row + 1);
	}
	else if (this.direction === "left") {
		newHead = new block(head.col - 1, head.row);
	}
	else if (this.direction === "up") {
		newHead = new block (head.col, head.row-1);
	}

	if (this.checkCollision(newHead)) {
		gameOver();
		return;
	}

	this.segments.unshift(newHead);

	if (newHead.equal(apple.position)) {
		score++;
		apple.move();
	}
	else {
		this.segments.pop();
	}
};

Snake.prototype.checkCollision = function(head) {
	var leftCollision = (head.col === 0),
		topCollision = (head.row === 0),
		rightCollision = (head.col === widthInBlocks - 1),
		bottomCollision = (head.row === heightInBlocks -1),

		wallCollision = leftCollision || topCollision || rightCollision || bottomCollision,

		selfCollision = false

		for (var i = 0; i < this.segments.length; i++) {
			if (head.equal(this.segments[i])) {
				selfCollision = true;
			}
		}
		return wallCollision || selfCollision;
};

// Adding keyboard events

var directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

$("body").keydown(function(event) {
	var newDirection = directions[event.keyCode];
	if (newDirection !== undefined) {
		snake.setDirection(newDirection);
	}
});

// Checks if a illegal direction is tried

Snake.protoype.setDirection = function(newDirection) {
	if (this.direction === "up" && newDirection === "down") {
		return;
	}
	else if (this.direction === "down" && newDirection === "up") {
		return;
	}
	else if (this.direction === "left" && newDirection === "right") {
		return;
	}
	else if (this.direction === "right" && newDirection === "left") {
		return;
	}

	this.nextDirection = newDirection;
};




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

