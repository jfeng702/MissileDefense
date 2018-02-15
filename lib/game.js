import Missile from './missile';
import Cannon from './cannon';
// Set up onClick event to the draw circle function.
class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.sound = document.getElementsByClassName('track');
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.canvas.onclick = this.mouseClickHandler;
    this.ctx = this.canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.cannonWave = this.cannonWave.bind(this);
    this.missiles = [];
    this.cannons = [];
    this.run();
    this.startTime = new Date();
    this.lives = 7;
    this.myGamePiece;
    this.myObstacles = [];
    this.mySound;
    this.myMusic;
  }

  drawScore() {
    let endTime = new Date();
    var timeDiff = endTime - this.startTime;
    timeDiff /= 100;
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + Math.round(timeDiff), 30, 30);
  }

  cannonWave() {
    let cannon;
    this.cannons.push(new Cannon(this.canvas));
    let timeDiff = (new Date() - this.startTime)/100;
    if (timeDiff > 0 && timeDiff < 200) {
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 200 && timeDiff < 400) {
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 400) {
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
    }

  }

  drawLives() {
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width-100, 30);
  }


  mouseClickHandler(e) {
    let x = e.clientX - this.canvas.offsetLeft;
    let y = e.clientY;
    let missile = new Missile({x: x, y: y}, this.canvas, this.ctx);
    this.missiles.push(missile);
  }

  run() {
    let cannon = new Cannon(this.canvas);
    this.cannons.push(cannon);
    this.cannons.push(new Cannon(this.canvas));
    this.cannons.push(new Cannon(this.canvas));

    setInterval(this.cannonWave, 6000);
    // let missile = new Missile;
    // this.missiles.push(missile);
    this.loop();
  }


  update() {
    this.cannons.forEach((cannon, i) => {
      cannon.update();
      // check whether cannon has hit the ground
      cannon.isCollidedWith(this.missiles);
      if (cannon.collided) {
        this.cannons.splice(i,1);
      } else if (cannon.hit) {
        this.lives -= 1;
        this.cannons.splice(i,1);
        if (this.lives === 0) {
          alert('Game Over');
          document.location.reload();
        }
      }
    });

    this.missiles.forEach(missile => {
      missile.update();
    });
  }



  render() {
    this.ctx.clearRect(0, 0, 800, 800);
    this.cannons.forEach(cannon => {
      cannon.render(this.ctx);
    });
    this.missiles.forEach(missile => {
      missile.render(this.ctx);
    });
    this.drawScore();
    this.drawLives();

    // setInterval(Missile.render(ctx), 1);
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  }
}
new Game;
