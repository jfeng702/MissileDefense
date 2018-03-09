/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sound__ = __webpack_require__(5);





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

    let sounds = ['https://res.cloudinary.com/slicecloud/video/upload/v1518733944/Reloaded_Warez_Group_-_2012_Install_music_Mp3Converter.net_usxch8.mp3'];
    let audioContext = new (window.AudioContext||window.webkitAudioContext)();

    let buffer = new __WEBPACK_IMPORTED_MODULE_3__buffer__["a" /* default */](audioContext, sounds);
    buffer.loadAll();

    let sound = new __WEBPACK_IMPORTED_MODULE_4__sound__["a" /* default */](audioContext, buffer.getSoundByIndex(0));
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
      this.barrageCount --;
      // debugger;
      // wave 1
      let missile1 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 100, y: 700}, this.canvas, this.ctx, 160);
      let missile2 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 300, y: 700}, this.canvas, this.ctx, 160);
      let missile3 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 500, y: 700}, this.canvas, this.ctx, 160);
      let missile4 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 700, y: 700}, this.canvas, this.ctx, 160);
      // wave 2
      let missile5 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 100, y: 500}, this.canvas, this.ctx, 160);
      let missile6 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 300, y: 500}, this.canvas, this.ctx, 160);
      let missile7 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 500, y: 500}, this.canvas, this.ctx, 160);
      let missile8 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 700, y: 500}, this.canvas, this.ctx, 160);
      // wave 3
      let missile9 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 100, y: 300}, this.canvas, this.ctx, 160);
      let missile10 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 300, y: 300}, this.canvas, this.ctx, 160);
      let missile11 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 500, y: 300}, this.canvas, this.ctx, 160);
      let missile12 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 700, y: 300}, this.canvas, this.ctx, 160);
      // wave 4
      let missile13 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 100, y: 100}, this.canvas, this.ctx, 160);
      let missile14 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 300, y: 100}, this.canvas, this.ctx, 160);
      let missile15 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 500, y: 100}, this.canvas, this.ctx, 160);
      let missile16 = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: 700, y: 100}, this.canvas, this.ctx, 160);
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
    this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    let timeDiff = (new Date() - this.startTime)/100;
    if (timeDiff > 100 && timeDiff < 200) {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 200 && timeDiff < 400) {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else if (timeDiff >= 400 && timeDiff < 600) {
      // this.cannons.push(new Cannon(this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
      // this.cannons.push(new Cannon(this.canvas));
    } else {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
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
    let missile = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: x, y: y}, this.canvas, this.ctx);
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

window.onload = function() {

};

document.addEventListener('DOMContentLoaded', function(){
  new Game;
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Missile {
  constructor(position, canvas, ctx, shellMax = 50) {
    this.startrocketx = position['x'];
    this.startrockety = position['y'];
    this.shellRadius = 30;
    this.shellMax = shellMax;
    this.dr = 2;
    this.pos = {x: this.startrocketx, y: this.startrockety};
    this.collided = false;
    this.canvas = canvas;
    this.currentX = this.canvas.width/2;
    this.currentY = this.canvas.height;
    this.startX = this.canvas.width / 2;
    this.startY = this.canvas.height;
    this.xdif = this.startrocketx - this.startX;
    this.ydif = this.startrockety - this.startY;
    this.exploded;
    this.ctx = ctx;
  }

  update() {
    if (this.currentY > this.startrockety) {
      this.currentX += this.xdif/40;
      this.currentY += this.ydif/40;
    } else {
      this.exploded = true;
    }
    this.pos = {x: this.currentX, y: this.currentY};
  }

  render() {
    // have to set a loop here somehow, otherwise it draws one point.
    if (!this.exploded) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width/2, this.canvas.height);
      this.ctx.lineTo(this.currentX, this.currentY);
      this.ctx.strokeStyle = 'yellow';
      this.ctx.stroke();
      this.ctx.closePath();
    } else {
      this.renderCircle(this.ctx);
    }
  }

  renderCircle() {

    this.ctx.beginPath();
    this.ctx.arc(this.startrocketx,this.startrockety,this.shellRadius,0,Math.PI*2, false);
    this.ctx.strokeStyle = 'orange';
    this.ctx.stroke();
    this.ctx.closePath();
    if (this.shellRadius + this.dr >= this.shellMax) {
      this.dr = -this.dr;
    }
    if (this.shellRadius + this.dr > 0) {
      this.shellRadius += this.dr;
    } else {
      this.shellRadius = 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cannon {
  constructor(canvas) {
    // Cannon comes from random x value at start and finishes at random x value.
    this.startX = canvas.width * Math.random();
    this.startY = 0;
    let endX = canvas.width * Math.random();
    let endY = canvas.height;
    this.xdif = endX - this.startX;
    this.ydif = endY - this.startY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.canvas = canvas;
    this.pos = {x: this.currentX, y: this.currentY};
    this.collided = false;
    this.hit = false;
  }

  isCollidedWith(missiles) {
    missiles.forEach( missile => {
      if ((Math.pow(this.pos['x']-missile.pos['x'], 2)
      + Math.pow(this.pos['y'] - missile.pos['y'], 2) <= Math.pow(missile.shellRadius,2))
      && missile.exploded) {
        this.collided = true;
      }
    });
  }

  isHit() {
    if (this.pos['y'] >= this.canvas.height) {
      this.hit = true;
    }
  }

  update() {
    // debugger;
    this.currentX += this.xdif/600;
    this.currentY += this.ydif/600;
    this.pos = {x: this.currentX, y: this.currentY};
    this.isHit();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

  }
}


/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    };
    this.stop = function(){
      this.sound.pause();
    };
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Sound);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Buffer {

  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      thisBuffer.context.decodeAudioData(request.response, function(buffer) {
        thisBuffer.buffer[index] = buffer;
        // updateProgress(thisBuffer.urls.length);
        if(index == thisBuffer.urls.length-1) {
          thisBuffer.loaded();
        }
      });
    };
    request.send();
  }

  loadAll() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    });
  }

  loaded() {
    // what happens when all the files are loaded
  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Buffer);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sound {

  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  play() {
    this.init();
    this.source.start(this.context.currentTime);
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sound);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map