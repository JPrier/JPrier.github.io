/*
Uncomment the random lines loops and functions to see them. They are currently too much to run on a webpage
*/


var innerBalls = [];
var outerBalls = [];
//var randomLines = [];
var innerCircleAmt = 20;
var outerCircleAmt = 40;
//var randomLinesAmt = 10;
var innerRadius = 200;
var outerRadius = 300;
//var lineLength = 5;

var ballSize = 10;
var canSize = 1000;

var indexTotal = 1000;
var speed = .25;
var lineDistance = 250;
var linespeed = [1, 40];
var spread = 25;

var width;
var height;

var oL = false;
//var iL = false;
var spreadSpeed = .2;

var colorB = 255;
var counter = 0;
var fps = 0;

var piIndex;

var IsGoodPerformance;

p5.disableFriendlyErrors = true;

function setup() {

		
	getHeight();
	getWidth();

	var cnv = createCanvas(width, height);
	cnv.parent('sketch-holder');

	for (var i = 0; i < innerCircleAmt; i++) {
		innerBalls[i] = new Ball();
		innerBalls[i].create(innerRadius, i, true);
	}

	for (var i = 0; i < outerCircleAmt; i++) {
		outerBalls[i] = new Ball();
		outerBalls[i].create(outerRadius, i, false);
	}

	piIndex = TWO_PI / indexTotal;
	/*
	for (var i = 0; i < randomLinesAmt; i++) {
		randomLines[i] = new LineBall();
		randomLines[i].create();
	}*/


	//Benchmarking
	var StartTime = new Date().getTime();
	BenchMarkTestFunction(); // render frame for example
	var EndTime = new Date().getTime();
	var ElapsedMilliseconds = EndTime - StartTime;
	var AcceptableTime = 3; // ten milliseconds
	IsGoodPerformance = ElapsedMilliseconds < AcceptableTime; // some number being acceptable performace

	if(!IsGoodPerformance) {
		alert(ElapsedMilliseconds);

		//android notification
		navigator.serviceWorker.register('sw.js');
		Notification.requestPermission(function(result) {
	  		if (result === 'granted') {
	    		navigator.serviceWorker.ready.then(function(registration) {
	      			registration.showNotification('Notification with ServiceWorker');
	    		});
  			}
		});
	}
}

function draw() {

	background(0);
  	
  	if(IsGoodPerformance) {
	  	for (var i = 0; i < innerCircleAmt; i++) {
			innerBalls[i].update();

			/*
			if (innerBalls[i].r > innerRadius*1.5 || iL) {
				innerBalls[i].r == innerRadius;
			} else {
				innerBalls[i].r += .5;
			}*/
		}
	}

	for (var i = 0; i < outerCircleAmt; i++) {
		outerBalls[i].update();

		
		if (outerBalls[i].r > outerRadius*1.2 || oL) {
			outerBalls[i].r -= spreadSpeed;

			if (i == outerCircleAmt - 1 && outerBalls[i].r == outerRadius) {
				oL = false;
			} else {
				oL = true;
			}
		} else {
			outerBalls[i].r += spreadSpeed;
		}
	}

	/*
	for (var i = 0; i < randomLinesAmt; i++) {
		randomLines[i].update();
	}*/

	// Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
	/*
	if ((counter % 10) == 0) {
		fps = frameRate();
	}
	fill(255);
	stroke(0);
	text("FPS: " + fps.toFixed(2), 30, 30);
	counter++;
	*/


}

function Ball() {

	this.i;
	this.r;
	this.x;
	this.y;
	this.inner;
	this.center;
	this.lines;
	this.index;

	this.create = function(r, i, inner) {

		this.inner = inner;
		this.r = r;

		this.index = i;

		if (inner) {
			this.i = i * (indexTotal/innerCircleAmt);
			this.center = createVector(width/2, 170);
		} else {
			this.i = i * (indexTotal/outerCircleAmt);
			this.center = createVector(width/2, 170);
		}

		this.x = this.center.x + this.r * (Math.sin(piIndex * i));
		this.y = this.center.y + this.r * (Math.cos(piIndex * i));

		this.lines = 0;
	}

	this.update = function() {

		if (this.inner && this.i < indexTotal) {
			this.i += speed;

		} else if (!this.inner && this.i > -indexTotal) {
			this.i -= speed;

		} else {
			this.i = 0;
		}

		this.center.x = Math.min(width, windowWidth)/2;

		this.x = this.center.x + this.r * (Math.sin(piIndex * this.i));
		this.y = this.center.y + this.r * (Math.cos(piIndex * this.i));

		this.show();
		if(IsGoodPerformance) {
			this.showLines();
		}

		this.lines = 0;
	}

	this.show = function() {
		noStroke();
		fill(colorB);
		ellipse(this.x, this.y, ballSize, ballSize);
	}

	this.showLines = function() {

		var distance;
		var other;

		noFill();

		if (this.inner) {

			for (var i = 0; i < outerBalls.length; i++) {

				other = outerBalls[i];
				distance = distSquared(this.x, this.y, other.x, other.y);

				if (distance < lineDistance) {
					stroke(colorB, 2 * (lineDistance-distance));
					line(this.x, this.y, other.x, other.y);
					this.lines++;
				}

				if (this.lines == 12) {
					break;
				}
			}
		}
	}
}
/*
function LineBall() {

	this.ox;
	this.x;
	this.y;
	this.location;
	this.lines = [];
	this.balls = [];

	this.create = function() {
		this.ox = Math.random() >= 0.5;

		if (this.ox) {
			this.x = random(0, width);
			
		} else {
			this.x = random(0, width);
		}

		this.y = random(100, height-100);

		this.location = createVector(this.x, this.y);

	}

	this.update = function() {

		if (this.x > width || this.x < 0) {
			if (this.ox) {
				this.x = 0;
			} else {
				this.x = width;
			}
			this.y = random(100, height-100);
			this.location.y = this.y;

		} else {
			if (this.ox) {
				this.x += random(linespeed[0], linespeed[1]) * speed;
			} else {
				this.x -= random(linespeed[0], linespeed[1]) * speed;
			}
		}

		this.location.x = this.x;

		this.show();
		this.showLines();

		for (var i = 0; i < lineLength; i++) {
			this.balls[i] = createVector(this.x + (spread*i), this.y);
		}

	}

	this.show = function() {

		noStroke();
		fill(255);

		for (var i = 0; i < this.balls.length; i++) {
			ellipse(this.balls[i].x, this.balls[i].y, ballSize, ballSize);
		}
	}

	this.showLines = function() {
		for (var j = 0; j < this.balls.length; j++) {
			for (var i = 0; i < outerBalls.length; i++) {

					var other = outerBalls[i];
					var distance = this.balls[j].dist(other.location);

					if (distance < lineDistance) {
						stroke(255, 2 * (lineDistance-distance));
						noFill();
						line(this.balls[j].x, this.y, other.x, other.y);
					}
				}
			for (var i = 0; i < innerBalls.length; i++) {

				var other = innerBalls[i];
				var distance = this.balls[j].dist(other.location);

				if (distance < lineDistance) {
					stroke(255, 2 * (lineDistance-distance));
					noFill();
					line(this.balls[j].x, this.y, other.x, other.y);
				}
			}

			for (var i = 0; i < randomLines.length; i++) {

				var other = randomLines[i];
				if (other.location != this.balls[j].location) {
					var distance = this.balls[j].dist(other.location);

					if (distance < lineDistance) {
						stroke(255, 2 * (lineDistance-distance));
						noFill();
						line(this.balls[j].x, this.y, other.x, other.y);
					}
				}
			}
		}
	}
}
*/
function getWidth() {
  width = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function windowResized() {
	getWidth();
	getHeight();
	resizeCanvas(Math.min(width, windowWidth), Math.min(height, windowHeight));

}

function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

//Call draw once to see how long it takes to do it once on the current device
function BenchMarkTestFunction() {
	background(0);
  
  	for (var i = 0; i < innerCircleAmt; i++) {
		innerBalls[i].update();

		/*
		if (innerBalls[i].r > innerRadius*1.5 || iL) {
			innerBalls[i].r == innerRadius;
		} else {
			innerBalls[i].r += .5;
		}*/
	}

	for (var i = 0; i < outerCircleAmt; i++) {
		outerBalls[i].update();

		
		if (outerBalls[i].r > outerRadius*1.2 || oL) {
			outerBalls[i].r -= spreadSpeed;

			if (i == outerCircleAmt - 1 && outerBalls[i].r == outerRadius) {
				oL = false;
			} else {
				oL = true;
			}
		} else {
			outerBalls[i].r += spreadSpeed;
		}
	}
}