import Missile from './missile';
import Cannon from './cannon';
import Audio from './audio';
import Buffer from './buffer';
import Sound from './sound';
// Set up onClick event to the draw circle function.
class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.sound = document.getElementById('track');
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.missileBarrage = this.missileBarrage.bind(this);
    document.addEventListener("keydown", this.missileBarrage, false);
    this.keyEventHandler = this.keyEventHandler.bind(this);
    document.addEventListener("keydown", this.keyEventHandler, false);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    document.addEventListener('mousemove', this.mouseMoveHandler, false);
    this.canvas.onclick = this.mouseClickHandler;
    // document.addEventListener('load', this.loadSound('http://res.cloudinary.com/slicecloud/video/upload/v1518754934/laser_rlz3ww.mp3'), false);
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
    this.itemSound;

    // this.audioContext = this.audioContext.bind(this);

    this.soundBuffer;
  }


  // loadSound(url) {
  //   this.audioContext = new (window.AudioContext||window.webkitAudioContext)();
  //   let audioContext = this.audioContext;
  //   let request = new XMLHttpRequest();
  //   request.open('GET', url, true);
  //   request.responseType = 'arraybuffer';
  //   request.onload = function() {
  //     audioContext.decodeAudioData(request.response, function(buffer) {
  //       this.soundBuffer = buffer;
  //     }, console.log('audio error'));
  //   };
  //   request.send();
  // }

  playSound() {
    // let sound = document.getElementById('laser');

    let sounds = ['http://res.cloudinary.com/slicecloud/video/upload/v1518733944/Reloaded_Warez_Group_-_2012_Install_music_Mp3Converter.net_usxch8.mp3'];
    let audioContext = new (window.AudioContext||window.webkitAudioContext)();

    let buffer = new Buffer(audioContext, sounds);
    buffer.loadAll();

    let sound = new Sound(audioContext, buffer.getSoundByIndex(0));
    sound.play();
    // this.audioContext = new AudioContext();

    // var source = this.audioContext.createMediaElementSource(sound);
    // source.play();
  }

  // playSound(buffer) {
  //
  //   var source = this.audioContext.createBufferSource(); // creates a sound source
  //   source.buffer = buffer;                    // tell the source which sound to play
  //   source.connect(this.audioContext.destination);       // connect the source to the context's destination (the speakers)
  //   source.start(0);                           // play the source now
  // }
  //
  //
  // pointer() {
  //   var point = new Image();
  //   point.src = 'images/missile.png';
  //   this.ctx.save();
  //   this.ctx.translate(350,720);
  //   this.ctx.rotate(45 * Math.PI/180);
  //   this.ctx.drawImage(point, 0,0,100,100);
  //   this.ctx.restore();
  // }

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
    this.ctx.font = "50px Lora";
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Missile Defense", this.canvas.width/2, this.canvas.height/2);
    this.ctx.font = "15px Lora";
    this.ctx.fillText("We are under attack from the enemy. Use your mouse to direct anti-missile fire."
    , this.canvas.width/2, this.canvas.height/2 + 50);
    this.ctx.fillText("Press the up arrow key for a missile barrage.",
    this.canvas.width/2, this.canvas.height/2 + 75);
    this.ctx.fillText("Good luck.",
    this.canvas.width/2, this.canvas.height/2 + 100);
    this.ctx.font = "20px Lora";
    this.ctx.fillText("Press Enter To Start", this.canvas.width/2, this.canvas.height/2 + 150);

  }

  missileBarrage(e) {

    if(e.keyCode === 38 && this.barrageCount > 0) {
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
    this.ctx.font = "16px Lora";
    this.ctx.fillStyle = "#ffffcc";
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
      // this.cannons.push(new Cannon(this.canvas));
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
  }

  run() {
    this.playTrack();
    // this.itemSound = new Sound('./audio/item.mp3');
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
        // this.itemSound.play();
        // this.playSound();
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
    // this.pointer();
    // setInterval(Missile.render(ctx), 1);
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  }
}
new Game;
