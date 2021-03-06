import Missile from './missile';
import Cannon from './cannon';
import SoundEffects from './SoundEffects';

class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.missileBarrage = this.missileBarrage.bind(this);
    document.addEventListener("keydown", this.missileBarrage, false);
    this.keyEventHandler = this.keyEventHandler.bind(this);
    document.addEventListener("keydown", this.keyEventHandler, false);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    document.addEventListener('mousemove', this.mouseMoveHandler, false);
    this.canvas.onclick = this.mouseClickHandler;
    this.ctx = this.canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.cannonWave = this.cannonWave.bind(this);
    this.missiles = [];
    this.cannons = [];
    this.startTime = new Date();
    this.lives = 7;
    this.barrageCount = 3;
    this.intro();
    this.lastBarrageTime = new Date()-10000;
    this.soundEffects = new SoundEffects();
  }

  mouseMoveHandler(e) {
    var relativeX = e.clientX - this.canvas.offsetLeft;
    var relativeY = e.clientY - this.canvas.offsetTop;
    return {x: relativeX, y: relativeY};
  }

  keyEventHandler(e) {
    if (e.keyCode === 13) {
      this.run();
    } else if (e.keyCode === 77) {
      this.playTrack('pause');
    }
  }

  intro() {
    this.ctx.font = "50px Questrial";
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Missile Defense", this.canvas.width/2, this.canvas.height/2);
    this.ctx.font = "20px Questrial";
    this.ctx.fillText("We are under attack from the enemy. Use your mouse to direct anti-missile fire."
    , this.canvas.width/2, this.canvas.height/2 + 50);
    this.ctx.fillText("Press the up arrow key for a missile barrage.",
    this.canvas.width/2, this.canvas.height/2 + 75);
    this.ctx.fillText("Good luck.",
    this.canvas.width/2, this.canvas.height/2 + 100);
    this.ctx.font = "20px Questrial";
    this.ctx.fillText("Press Enter To Start", this.canvas.width/2, this.canvas.height/2 + 150);

  }

  missileBarrage(e) {

    if(e.keyCode === 38 && this.barrageCount > 0) {
      this.soundEffects.play('barrage');
      this.barrageCount --;
      // debugger;
      // wave 1
      let missile1 = new Missile({x: 100, y: 700}, this.canvas, this.ctx, 160);
      let missile2 = new Missile({x: 300, y: 700}, this.canvas, this.ctx, 160);
      let missile3 = new Missile({x: 500, y: 700}, this.canvas, this.ctx, 160);
      let missile4 = new Missile({x: 700, y: 700}, this.canvas, this.ctx, 160);
      // wave 2
      let missile5 = new Missile({x: 100, y: 500}, this.canvas, this.ctx, 160);
      let missile6 = new Missile({x: 300, y: 500}, this.canvas, this.ctx, 160);
      let missile7 = new Missile({x: 500, y: 500}, this.canvas, this.ctx, 160);
      let missile8 = new Missile({x: 700, y: 500}, this.canvas, this.ctx, 160);
      // wave 3
      let missile9 = new Missile({x: 100, y: 300}, this.canvas, this.ctx, 160);
      let missile10 = new Missile({x: 300, y: 300}, this.canvas, this.ctx, 160);
      let missile11 = new Missile({x: 500, y: 300}, this.canvas, this.ctx, 160);
      let missile12 = new Missile({x: 700, y: 300}, this.canvas, this.ctx, 160);
      // wave 4
      let missile13 = new Missile({x: 100, y: 100}, this.canvas, this.ctx, 160);
      let missile14 = new Missile({x: 300, y: 100}, this.canvas, this.ctx, 160);
      let missile15 = new Missile({x: 500, y: 100}, this.canvas, this.ctx, 160);
      let missile16 = new Missile({x: 700, y: 100}, this.canvas, this.ctx, 160);
      // wave 1
      this.missiles.push(missile1);
      this.missiles.push(missile2);
      this.missiles.push(missile3);
      this.missiles.push(missile4);
      // wave 2
      setTimeout(() => this.missiles.push(missile5), 500);
      setTimeout(() => this.missiles.push(missile6), 500);
      setTimeout(() => this.missiles.push(missile7), 500);
      setTimeout(() => this.missiles.push(missile8), 500);
      // wave 3
      setTimeout(() => this.missiles.push(missile9), 1000);
      setTimeout(() => this.missiles.push(missile10), 1000);
      setTimeout(() => this.missiles.push(missile11), 1000);
      setTimeout(() => this.missiles.push(missile12), 1000);
      // wave 4
      setTimeout(() => this.missiles.push(missile13), 1500);
      setTimeout(() => this.missiles.push(missile14), 1500);
      setTimeout(() => this.missiles.push(missile15), 1500);
      setTimeout(() => this.missiles.push(missile16), 1500);
    }
  }

  drawScore() {
    let endTime = new Date();
    var timeDiff = endTime - this.startTime;
    timeDiff /= 100;
    this.ctx.font = "18px Questrial";
    // this.ctx.fillStyle = "#ffffcc";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + Math.round(timeDiff), 70, 30);
    this.ctx.fillText("Press M to mute.", 200, 30);
    this.ctx.fillText("Barrages: " + this.barrageCount,330,30);
  }

  playTrack(action="play") {

    let audioTag = document.getElementById('myAudio');
    audioTag.play();
    if (action === "pause") {
      if (audioTag.muted) {
        audioTag.muted = false;
      } else {
        audioTag.muted = true;
      }
    }
  }

  cannonWave() {
    let cannon;
    this.cannons.push(new Cannon(this.canvas));
    let timeDiff = (new Date() - this.startTime)/100;
    if (timeDiff > 100 && timeDiff < 200) {
      this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 200 && timeDiff < 400) {
      this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 400 && timeDiff < 600) {
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else {
      this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
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
    this.soundEffects.play('laser');
  }

  run() {
    this.soundEffects.gameStarted = true;
    this.playTrack();
    setInterval(this.cannonWave, 4500);
    this.loop();
  }

  update() {
    this.cannons.forEach((cannon, i) => {
      cannon.update();
      // check whether cannon has hit the ground
      cannon.isCollidedWith(this.missiles);

      if (cannon.collided) {
        this.cannons.splice(i,1);

        this.soundEffects.play('collision');
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
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  }
}

window.onload = function() {
  new Game;
};

document.addEventListener('DOMContentLoaded', function(){

});
