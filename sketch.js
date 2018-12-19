var radius = 5;
var x = 650;
var y = 350;
var ballx = x;
var bally = y;
var xdirection = 1;
var ydirection = 1;
var startSpeed = 1;
var xspeed = startSpeed;
var yspeed = startSpeed;
var brickHeight = 20;
var brickWidth = 110;
var startX = 200-brickWidth/2;
var startY = brickHeight * 30;
var pX = startX;
var pY = startY;
var r;
var g;
var b;
var bricks;
var bounced = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	ellipseMode(RADIUS);
	fill(255, 255, 0);
	makeBrick();
}

function draw(){
	background(0);
	ball();
	player();
	drawBricks();
}

function makeBrick(){
	bricks = [9];
	for (var i = 0; i < 10; i++){
		bricks[i] = [9];
		for(var j = 0; j < 10; j++){
			bricks[i][j] = [2];
			bricks[i][j][0] = brickWidth*(1+i)+(i*5)-5;
			bricks[i][j][1] = brickHeight*(1+j)+(j*5)+10;
			bricks[i][j][2] = true;
		}
	}
}

function drawBricks(){
	for (var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			check(i, j, bricks[i][j][0], bricks[i][j][1]);
			if(bricks[i][j][2]){
				rect(bricks[i][j][0], bricks[i][j][1], brickWidth, brickHeight);
			}
		}
	}
}

function check(i, j, bx, by){
	if(((ballx > bx)&&(ballx < bx+brickWidth)) && (bally+radius == by || bally-radius == by + brickHeight)){
		if(bricks[i][j][2]){
			bricks[i][j][2]=false;
			xdirection = -xdirection;
      colors();
		}
	}
	if(((bally > by)&&(bally < by+brickHeight)) && (ballx+radius >= bx && ballx-radius <= bx + brickWidth)){
		if(bricks[i][j][2]){
			bricks[i][j][2]=false;
			ydirection = -ydirection;
      colors();
		}
	}
}


function player(){
	rect(pX,pY,brickWidth,brickHeight);
	pX = mouseX;
}

function colors(){
	r = random(255);
	g = random(255);
	b = random(255);
  fill(r, g, b);
}

function ball(){
	ellipse(ballx, bally, radius, radius);
	bally += yspeed*ydirection;
  if(bounced){
	   ballx += xspeed*xdirection;
  }
	bounce();
	if((ballx+radius>width)||(ballx-radius<0)){
		xdirection = -xdirection;
    colors();
	}
	if(bally-radius<0){
		ydirection = -ydirection;
		colors();
	}
  if(bally+radius>pY+brickHeight){
    reset();
  }
}

function bounce(){
	if((ballx > pX)&&(ballx < pX+brickWidth)){
		if(bally+radius == pY){
      if (!bounced){
        xspeed = 2.5/2;
        yspeed = 2.5/2;
        bounced = true;
      }
      speed();
      colors();
			ydirection = -ydirection;
		}
	}
}

function speed(){
  if(ballx<(pX+brickWidth/2)){
    xdirection = -1;
  } else{
    xdirection = 1;
  }
  xspeed += (1+asin(((pX+brickWidth/2)-ballx)/(pX+(brickWidth/2)-pX)))/2;
  yspeed += (1+acos(((pX+brickWidth/2)-ballx)/(pX+(brickWidth/2)-pX)))/2;

}

function reset(){
  ballx = x;
  bally = y;
  pX = startX;
  pY = startY;
  xspeed = startSpeed;
  yspeed = startSpeed;
  bounced = false;
}
