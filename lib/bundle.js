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
    this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    let timeDiff = (new Date() - this.startTime)/100;
    if (timeDiff > 0 && timeDiff < 200) {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    } else if (timeDiff >= 200 && timeDiff < 400) {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    } else if (timeDiff >= 400) {
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
      this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
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
    let cannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas);
    this.cannons.push(cannon);
    this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Missile {
  constructor(position, canvas, ctx) {
    this.startrocketx = position['x'];
    this.startrockety = position['y'];
    this.shellRadius = 30;
    this.shellMax = 100;
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
    // debugger;
    // must fix this.
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
      this.ctx.moveTo(this.canvas.width/2, this.canvas.height);
      this.ctx.lineTo(this.currentX, this.currentY);
      this.ctx.stroke();
    } else {
      this.renderCircle(this.ctx);
    }
  }

  renderCircle() {

    this.ctx.beginPath();
    this.ctx.arc(this.startrocketx,this.startrockety,this.shellRadius,0,Math.PI*2, false);
    this.ctx.strokeStyle = 'black';
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
      // debugger;
      if ((Math.pow(this.pos['x']-missile.pos['x'], 2)
      + Math.pow(this.pos['y'] - missile.pos['y'], 2) <= Math.pow(missile.shellRadius,2))) {
        console.log('collision');
        this.collided = true;
        // debugger;
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
    this.currentX += this.xdif/450;
    this.currentY += this.ydif/450;
    this.pos = {x: this.currentX, y: this.currentY};
    this.isHit();
  }

  render(ctx) {
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);
    ctx.stroke();

  }
}


/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map