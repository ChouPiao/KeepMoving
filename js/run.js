function colorBarAnimframe()  {
  
  this.div,
  this.progress,
  this.speed,
  
  this.init = function(index) {
    this.div = document.getElementById("color_bar" + index);
    this.reset();
  }

  this.reset = function(index) {
    this.progress = 0;
    this.newSpeed();
    this.newBackground();
  }

  this.nextFrame = function() {
    this.progress += this.speed;
    if (this.progress > 100) {
      this.progress -= 100;
      this.newSpeed();
      this.newBackground();
    }
    this.div.style.width = this.progress + "%";
  }

  this.newSpeed = function()  {
    this.speed = Math.random() * 2 + 0.05;
  }

  this.newBackground = function() {
    this.div.style.background = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
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

var restart = function () {
  for (var i = 0; i < 10; ++ i) {
    barList[i].reset();
  }
};

inputManager = new KeyboardInputManager;
inputManager.on("restart", restart);

