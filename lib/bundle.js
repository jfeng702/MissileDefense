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
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.canvas.onclick = this.mouseClickHandler;
    this.ctx = this.canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.missiles = [];
    this.cannons = [];
    this.run();
  }

  remove() {

  }

  mouseClickHandler(e) {
    console.log('this works');
    let x = e.clientX - this.canvas.offsetLeft;
    let y = e.clientY;
    let missile = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({x: x, y: y});

    console.log(this.missiles);
    this.missiles.push(missile);
  }

  run() {
    let cannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas);
    this.cannons.push(cannon);
    this.cannons.push(new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */](this.canvas));
    // let missile = new Missile;
    // this.missiles.push(missile);

    this.loop();
  }


  update() {
    this.cannons.forEach(cannon => {
      cannon.update();
    });
    this.cannons.forEach(cannon => {
      cannon.isCollidedWith(this.missiles);
    });
    // Remove any collided missiles from store.
    this.cannons.forEach((cannon,idx) => {
      if (cannon.collided) {
        console.log(this.cannons);
        console.log('collided');
        this.cannons.splice(idx,1);
        console.log(this.cannons);
        console.log(idx);
      }
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


    // setInterval(Missile.render(ctx), 1);
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  }
}
new Game;

// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById('myCanvas');
//   const ctx = canvas.getContext('2d');
//   let shellRadius = 1;
//   let shellMax = 100;
//   // var x = canvas.width/2;
//   // var y = canvas.height-100;
//   var dr = 1;
//   let startrocketx = 0;
//   let startrockety = 0;
//   let endrocketx = (canvas.width/2);
//   let endrockety = canvas.height;
//   var dx = 1;
//   var dy = 1;

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
//   function drawRocket() {
//     let xdif = endrocketx - startrocketx;
//     let ydif = endrockety - startrockety;
//     ctx.moveTo(startrocketx, startrockety);
//     // Set endpoint to 1/100th of the distance to canvas height, to animate drawing of line.
//     ctx.lineTo(startrocketx+xdif/100, startrockety+ydif/100);
//     ctx.stroke();
//     // if canvas height not reached, then increment both x and y
//     if (startrockety + ydif/100 < canvas.height) {
//       startrockety += ydif/100;
//       startrocketx += xdif/100;
//     }
//   }
//
//   canvas.addEventListener('click', launchShell, false);
//   function launchShell(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     var relativeY = e.clientY - canvas.offsetTop;
//     // draw(relativeX,relativeY);
//   }
//
//   // setInterval(draw, 1);
//   // setInterval(drawRocket, 1);
// });


// Create collision engine calculating for a square at first
// as doing so for a circle would require trig.


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Missile {
  constructor(position) {
    this.startrocketx = position['x'];
    this.startrockety = position['y'];
    this.shellRadius = 30;
    this.shellMax = 100;
    this.dr = 3;
    this.pos = {x: this.startrocketx, y: this.startrockety};
    this.collided = false;
  }



  render(ctx) {
    // have to set a loop here somehow, otherwise it draws one point.
    ctx.beginPath();
    ctx.arc(this.startrocketx,this.startrockety,this.shellRadius,0,Math.PI*2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
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

  update() {
    this.currentX += this.xdif/100;
    this.currentY += this.ydif/100;
    this.pos = {x: this.currentX, y: this.currentY};
  }

  render(ctx) {
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);
    // Set endpoint to 1/100th of the distance to canvas height, to animate drawing of line.
    // ctx.lineTo(this.startrocketx+xdif/100, this.startrockety+ydif/100);
    ctx.stroke();
    // // if canvas height not reached, then increment both x and y
    // if (this.startrockety + ydif/100 < this.canvas.height) {
    //   this.startrockety += ydif/100;
    //   this.startrocketx += xdif/100;
    // }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map