function colorBarAnimframe()  {
  
  this.div,
  this.progress,
  this.speed,
  
  this.init = function(index) {
    this.div = document.getElementById("color_bar" + index);
    this.reset(index);
  }

  this.reset = function(index) {
    this.progress = 0;
    this.newSpeed();
    this.newBackground();
  }

  this.nextFrame = function() {
    this.progress += this.speed;
    if (this.progress > 100) {
      this.progress %= 100;
      this.newBackground();
    }
    else if (this.progress < 0)
    {
      this.progress = this.progress % 100 + 100;
      this.newBackground();
    }
    this.div.style.width = this.progress + "%";
  }

  this.newSpeed = function()  {
    this.speed = Math.random() - 0.5;
  }

  this.newBackground = function() {
    this.div.style.background = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
  }

  this.increaseSpeed = function() {
    this.speed += 0.1;
  }

  this.decreaseSpeed = function() {
    this.speed -= 0.1;
  }
}
var barList = new Array();
var colorBar;
for (var i = 0; i < 10; ++ i) {
  colorBar = new colorBarAnimframe();
  colorBar.init(i);
  barList[i] = colorBar;
}

var progress = 0;

function step(timestamp) {
  for (var i = 0; i < 10; ++ i) {
    barList[i].nextFrame();
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

var curIndex = 0

var move = function (direction) {
  // 0: up, 1: right, 2: down, 3: left
  console.log(direction);
  if (direction == 1) {
    console.log(1);
    barList[curIndex].increaseSpeed();
  }
  else if (direction == 3) {
    console.log(3);
    barList[curIndex].decreaseSpeed();
  }
  else if (direction == 2) {
    console.log(2);
    curIndex = (curIndex + 1) % 10;
  }
  else if (direction == 0) {
    console.log(0);
    curIndex = (curIndex + 9) % 10;
  }
};

var restart = function () {
  for (var i = 0; i < 10; ++ i) {
    barList[i].reset(i);
  }
};

inputManager = new KeyboardInputManager;

inputManager.on("move", move);
inputManager.on("restart", restart);

