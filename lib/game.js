import Missile from './missile';
import Cannon from './cannon';
// Set up onClick event to the draw circle function.
class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.sound = document.getElementById('track');
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.missileBarrage = this.missileBarrage.bind(this);
    document.addEventListener("keydown", this.missileBarrage, false);
    this.canvas.onclick = this.mouseClickHandler;
    this.ctx = this.canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.cannonWave = this.cannonWave.bind(this);
    this.missiles = [];
    this.cannons = [];

    this.startTime = new Date();
    this.lives = 7;
    this.myGamePiece;
    this.myObstacles = [];
    this.mySound;
    this.myMusic;
    this.barrageCount = 3;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // this.run();
    this.intro = this.intro.bind(this);
    this.intro();
    this.lastBarrageTime = new Date()-10000;
  }

  intro() {
    this.ctx.font = "50px Impact";
    this.ctx.fillStyle = "#0099CC";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Missile Defense", this.canvas.width/2, this.canvas.height/2);

    this.ctx.font = "20px Arial";
    this.ctx.fillText("Press Enter To Start", this.canvas.width/2, this.canvas.height/2 + 50);
  }


  missileBarrage(e) {

    if(e.keyCode === 38 && this.barrageCount > 0) {
      this.barrageCount --;
      console.log(this.barrageCount);
      // debugger;
      // wave 1
      let missile1 = new Missile({x: 100, y: 700}, this.canvas, this.ctx, 135);
      let missile2 = new Missile({x: 300, y: 700}, this.canvas, this.ctx, 135);
      let missile3 = new Missile({x: 500, y: 700}, this.canvas, this.ctx, 135);
      let missile4 = new Missile({x: 700, y: 700}, this.canvas, this.ctx, 135);
      // wave 2
      let missile5 = new Missile({x: 100, y: 500}, this.canvas, this.ctx, 135);
      let missile6 = new Missile({x: 300, y: 500}, this.canvas, this.ctx, 135);
      let missile7 = new Missile({x: 500, y: 500}, this.canvas, this.ctx, 135);
      let missile8 = new Missile({x: 700, y: 500}, this.canvas, this.ctx, 135);
      // wave 3
      let missile9 = new Missile({x: 100, y: 300}, this.canvas, this.ctx, 135);
      let missile10 = new Missile({x: 300, y: 300}, this.canvas, this.ctx, 135);
      let missile11 = new Missile({x: 500, y: 300}, this.canvas, this.ctx, 135);
      let missile12 = new Missile({x: 700, y: 300}, this.canvas, this.ctx, 135);
      // wave 4
      let missile13 = new Missile({x: 100, y: 100}, this.canvas, this.ctx, 135);
      let missile14 = new Missile({x: 300, y: 100}, this.canvas, this.ctx, 135);
      let missile15 = new Missile({x: 500, y: 100}, this.canvas, this.ctx, 135);
      let missile16 = new Missile({x: 700, y: 100}, this.canvas, this.ctx, 135);
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
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + Math.round(timeDiff), 30, 30);
  }

playTrack(url) {
  let song1 = new Audio;
  song1.src = 'http://jPlayer.org/audio/mp3/gbreggae-leadguitar.mp3';
  song1.play();
}
  //
  //
  // playTrack(url) {
  //       var request = new XMLHttpRequest();
  //       request.open('GET', url, true);
  //       request.responseType = 'arraybuffer';
  //
  //       var audiobuffer;
  //       request.onload = () => {
  //     if (request.status == 200) {
  //
  //       this.con.decodeAudioData(request.response, function(buffer) {
  //         var source = context.createBufferSource();
  //         source.buffer = buffer;
  //         source.connect(context.destination);
  //         console.log('context.currentTime ' + context.currentTime);
  //
  //         if (this.offset == 0) {
  //           source.start();
  //           this.offset = context.currentTime;
  //         } else {
  //           source.start(0,context.currentTime - this.offset);
  //         }
  //
  //       }, function(e) {
  //         console.log('Error decoding audio data:' + e);
  //       });
  //     } else {
  //       console.log('Audio didn\'t load successfully; error code:' + request.statusText);
  //     }
  //   };
  //   request.send();
  // }

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
    // this.playTrack(this.sound.href);
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
