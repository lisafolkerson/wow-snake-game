// Set Up the Canvas

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// get width and height from canvas
var width = canvas.width;
var height = canvas.height;


var blockSize = 10;
var widthInBlocks = Math.floor(width / blockSize);
var heightInBlocks = Math.floor (height / blockSize);

// draw the border 
var border = function() {
	context.fillStyle = "HotPink";
	context.fillRect(0,0,width,blockSize);
	context.fillRect(0,0,blockSize,height);
	context.fillRect(0,height-blockSize,width,blockSize);
	context.fillRect(width-blockSize, 0, blockSize, height);
}

// border();

// Set the score to 0
//display the score
var score = 0;

var displayScore = function(){
	context.fillStyle = "rgb(0,0,0)";
	context.font = "18px Courier";
	context.textBaseline = 'top';
	context.textAlign = "left";
	context.fillText('Your score is: ' + score, blockSize*2, blockSize*2);

};

// create GameOver Suckaaaa text
var gameOver = function() {
	// clearInterval(interval);
	context.font = "60px Courier";
	context.fillStyle = "rgb(0,0,0)";
	context.textAlign = "center";
	context.textBaseline = "middle"
	context.fillText("GAME OVER FOOL!", canvas.width/2, canvas.height/2);

	$(window).keypress(function(e) {
		if (e.keyCode === 0 || e.keyCode === 32) {
			location.reload();
		}
	});

}

// create try again text
var tryAgain = function() {
	context.font = "30px Courier";
	context.fillStyle = "rgb(0,0,0)";
	context.textAlign = "center";
	context.textBaseline = "top"
	context.fillText("Press SPACEBAR to Try Again!", canvas.width/2, canvas.height/2 + 50) ;
}

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

// create the apple
block.prototype.drawCircle = function(color) {
	var centerX = this.col * blockSize + blockSize / 2;
	var centerY = this.row * blockSize + blockSize / 2;
	context.fillStyle = color;
	context.beginPath();
	context.arc(centerX, centerY, blockSize / 2, 0, Math.PI*2, false);
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'limegreen';
	context.stroke();
};


block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
};

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
		tryAgain();
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
	var leftCollision = (head.col === 0);
	var	topCollision = (head.row === 0);
	var	rightCollision = (head.col === widthInBlocks-1);
	var	bottomCollision = (head.row === heightInBlocks-1);

	var	wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

	var	selfCollision = false;

		for (var i = 0; i < this.segments.length; i++) {
			if (head.equal(this.segments[i])) {
				selfCollision = true;
			}
		}
		return wallCollision || selfCollision;
}

// Checks if a illegal direction is tried
Snake.prototype.setDirection = function(newDirection) {
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


var Apple = function() {
	this.position = new block(10,10);
};

Apple.prototype.draw = function() {
	this.position.drawCircle('chartreuse');
};

Apple.prototype.move = function() {
	var randomCol = Math.floor(Math.random() * (widthInBlocks -2)) + 1;
	var randomRow = Math.floor(Math.random() * (heightInBlocks -2)) + 1;
	this.position = new block(randomCol, randomRow);

	while(apple == block) {
		apple.move();
	}
};

var apple = new Apple();
var snake = new Snake();

var intervalId = setInterval(function() {
	context.clearRect(0, 0, width, height);
	displayScore();
	snake.move();
	snake.draw();
	apple.draw();
	border();
}, 80);

// Adding keyboard events
var directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

// Add a reset for score and snake when the game ends
var reset = function() {
	// reset snake segments
	Snake = function(){
		this.segments = [
			new block (7,5),
			new block (6,5),
			new block(5,5)
		];
		this.direction = 'right';
		this.nextDirection = 'right';
	};
	// reset score to 0
	score = 0;
};

$("body").keydown(function(event) {
	var newDirection = directions[event.keyCode];
	if (newDirection !== undefined) {
		snake.setDirection(newDirection);
	}
});
