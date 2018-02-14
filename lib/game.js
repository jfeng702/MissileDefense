import Missile from './missile';
// Set up onClick event to the draw circle function.
class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.entities = {
      'missiles': [],
    };
    this.run();
  }

  run() {
    this.loop(this.ctx);
  }

  render() {
    this.ctx.clearRect(0, 0, 800, 800);
    Missile.render(this.ctx);
    // setInterval(Missile.render(ctx), 1);
  }

  loop() {
    this.render();
    requestAnimationFrame(this.loop);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  let shellRadius = 1;
  let shellMax = 100;
  // var x = canvas.width/2;
  // var y = canvas.height-100;
  var dr = 1;
  let startrocketx = 0;
  let startrockety = 0;
  let endrocketx = (canvas.width/2);
  let endrockety = canvas.height;
  var dx = 1;
  var dy = 1;

  // function draw(x,y){
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.beginPath();
  //   ctx.arc(x,y,shellRadius,0,Math.PI*2, false);
  //   ctx.strokeStyle = 'black';
  //   ctx.stroke();
  //   ctx.closePath();
  //   if (shellRadius + dr < shellMax) {
  //   } else if (shellRadius + dr >= shellMax) {
  //     dr = -dr;
  //   }
  //
  //   shellRadius += dr;
  // }

// Randomize start x and end x to make incoming missiles.
  function drawRocket() {
    let xdif = endrocketx - startrocketx;
    let ydif = endrockety - startrockety;
    ctx.moveTo(startrocketx, startrockety);
    // Set endpoint to 1/100th of the distance to canvas height, to animate drawing of line.
    ctx.lineTo(startrocketx+xdif/100, startrockety+ydif/100);
    ctx.stroke();
    // if canvas height not reached, then increment both x and y
    if (startrockety + ydif/100 < canvas.height) {
      startrockety += ydif/100;
      startrocketx += xdif/100;
    }
  }

  canvas.addEventListener('click', launchShell, false);
  function launchShell(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    // draw(relativeX,relativeY);
  }

  // setInterval(draw, 1);
  // setInterval(drawRocket, 1);
});

new Game;

// Create collision engine calculating for a square at first
// as doing so for a circle would require trig.
