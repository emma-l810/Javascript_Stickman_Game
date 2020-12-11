var lineYVel = 10
var angle = 90;
var radius = 0
//variable for keydown
var spacepress = false;
var onetry = 0;

class Platform{
  //sets x, y, width, and height
  constructor(x1, rectWidth, windowHeight){
    this.ptx = x1;
    this.pty = windowHeight - 350;
    this.rectWidth = rectWidth;
    this.rectHeight = 350;
  }

  //getters and setters
  getptx(){ return this.ptx; }
  getpty(){ return this.pty; }
  getrectWidth(){ return this.rectWidth; }
  getrectHeight(){ return this.rectHeight; }

  //draws platform (filler = black)
  draw(){
    context.beginPath();
    context.fillRect(this.ptx, this.pty, this.rectWidth, this.rectHeight);
    context.stroke();
  }

}

class Person{
  //sets width/height for img
  constructor(){
    this.ptx = platform1.getptx() + platform1.getrectWidth() * (2/3);
    this.pty = platform1.getpty() - 30;
    this.rectWidth = 25;
    this.rectHeight = 30;
  }

  draw(){
    context.beginPath();
    context.fillRect(this.ptx, this.pty, this.rectWidth, this.rectHeight);
    context.stroke();

    console.log(this.ptx, this.pty, this.rectWidth, this.rectHeight);
  }
}

class Line{
  //sets values for points (and changing value y2)
  constructor(x1, y1){
    this.pt1 = [x1, y1];

    this._x2 = x1;
    this._y2 = y1;
    this.pt2 = [this._x1, this._y2];

    this.color = "#0000ff";
    this.width = 3;
    this.cap = 'round';

  }

  get x2(){ return this.pt2[0]; }
  set x2(newX2){ this.pt2[0] = newX2; }
  get y2(){ return this.pt2[1]; }
  set y2(newY2){ this.pt2[1] = newY2; }

  getRadius(){ return this.pt1[1] - this.pt2[1]; }

  move(){
    this.x2 = this.pt1[0];
    this.y2 -= lineYVel;
    console.log(this.y2, lineYVel, this);
    // Loop the animation to the next frame.
  }
  fall(){
    console.log(this.x2, this.y2);
    this.radians = (Math.PI / 180) * angle;
    this.x2 = Math.cos(this.radians) * radius + this.pt1[0];
    this.y2 = - Math.sin(this.radians) * radius + this.pt1[1];
    console.log(this.x2, this.y2, this.radians, radius);
  }

  draw(){
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.lineCap = this.cap;
    context.beginPath();
    context.moveTo(this.pt1[0], this.pt1[1]);
    context.lineTo(this.pt2[0], this.pt2[1]);
    context.stroke();
  }
}

function getRandomWidth(){
  /*
    Parameters: None
    Returns: float value for rectangle width
    Purpose: generates a random value to be set to platform width
  */
  rectWidth = Math.random() * (windowWidth/3 - windowWidth/8) + windowWidth/8;
  return rectWidth;
}

function myKeyDown(event){
  /*
    Parameters: key-down event
    Returns: key code (int value)
    Purpose: gets the key code for the key that is pressed
  */
  keyStr = event.key;

  if (keyStr == ' '){
    lineYVel += 5;
    spacepress = true;
    onetry += 1;
    console.log("pressed");
  }
  console.log(keyStr);
}

function myKeyUp(event){
  spacepress = false;
}

function drawAll(){
  /*
    Parameters: None (calls on other functions/methods)
    Returns: None (calls on itself per frame)
    Purpose: is the main drawing method
  */
  context.clearRect(0, 0, canvas.width, canvas.height);

  platform1.draw();
  platform2.draw();
  ninja.draw();
  line.draw();

  if (spacepress == true && onetry == 1){
    line.move();
    line.draw();

    radius = line.getRadius();
  }

  if (onetry > 1){
    if (angle >= 0){
      line.fall();
      line.draw();
      angle -= 1;
    }
  }

  window.requestAnimationFrame(drawAll);
}

//find the width and height of browser screen
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

//gets the canvas from html
canvas = document.getElementById("mainCanvas");

//get the canvas width and height (size you're working with)
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

//set the animation to 2-D
context = canvas.getContext("2d");

//add event listener for key press
document.addEventListener("keydown", myKeyDown);
document.addEventListener("keyup", myKeyUp);

//instantiates new variables for platforms
platform1 = new Platform(10, getRandomWidth(), windowHeight);
platform2 = new Platform((windowWidth/8) * 5, getRandomWidth(), windowHeight);

//gets the image from html
//img = document.getElementById("stickninja");

//icon for little stick Ninja
ninja = new Person();

//instantiates variable for the line
line = new Line(platform1.getrectWidth() + platform1.getptx(), platform1.getpty());

//get the animation
window.requestAnimationFrame(drawAll);

//Math.random() *(max - min) + min
