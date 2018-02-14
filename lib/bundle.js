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
    __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */].render(this.ctx);
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Missile {
  constructor() {
    this.startrocketx = 0;
    this.startrockety = 0;
    this.shellRadius = 30;
    this.shellMax = 100;
    this.dr = 1;


  }

  render(ctx) {
    var x = 400;
    var y = 700;
    // have to set a loop here somehow, otherwise it draws one point.
    console.log('missile render');
    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.arc(x,y,this.shellRadius,0,Math.PI*2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    if (this.shellRadius + this.dr < this.shellMax) {
    } else if (this.shellRadius + this.dr >= this.shellMax) {
      this.dr = -this.dr;
    }
    this.shellRadius += this.dr;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Missile);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map