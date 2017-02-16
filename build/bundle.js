/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//------------------------------------------------------
// -----------------Options-----------------------------
//------------------------------------------------------

var circlesNumber = 100;
var linkDistance = 150;
var linkThickness = 30;
var animationSpeed = 0.3;
var minCircleRadius = 2;
var maxCircleRadius = 7;

//------------------------------------------------------
// -----------------Setup-------------------------------
//------------------------------------------------------

var width = window.innerWidth; // eslint-disable-line
var height = window.innerHeight; // eslint-disable-line

var requestAnimationFrame = window.requestAnimationFrame || // eslint-disable-line
window.mozRequestAnimationFrame || // eslint-disable-line
window.webkitRequestAnimationFrame || // eslint-disable-line
window.msRequestAnimationFrame; // eslint-disable-line

var canvas = document.getElementById('root'); // eslint-disable-line
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;
ctx.strokeStyle = '#ff8ea8';
ctx.fillStyle = 'black';

//------------------------------------------------------
// -----------------Helpers-----------------------------
//------------------------------------------------------

function calculateDistance(c1, c2) {
  var a = c1.x + c1.direction.dirX - (c2.x + c2.direction.dirX);
  var b = c1.y + c1.direction.dirY - (c2.y + c2.direction.dirY);
  return Math.sqrt(a * a + b * b);
}

function drawLink(c1, c2) {
  ctx.lineWidth = linkThickness / calculateDistance(c1, c2);
  ctx.beginPath();
  ctx.moveTo(c1.x, c1.y);
  ctx.lineTo(c2.x, c2.y);
  ctx.stroke();
}

//------------------------------------------------------
// -----------------Circle------------------------------
//------------------------------------------------------

var Circle = function () {
  function Circle(_ref) {
    var id = _ref.id,
        x = _ref.x,
        y = _ref.y,
        radius = _ref.radius,
        direction = _ref.direction;

    _classCallCheck(this, Circle);

    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.direction = direction;
  }

  // change the previous direction of the circle


  _createClass(Circle, [{
    key: 'changeDirectionX',
    value: function changeDirectionX() {
      this.direction.dirX = -this.direction.dirX;
    }
  }, {
    key: 'changeDirectionY',
    value: function changeDirectionY() {
      this.direction.dirY = -this.direction.dirY;
    }

    // move the circle in his direction

  }, {
    key: 'move',
    value: function move(circles) {
      var _this = this;

      circles.forEach(function (circle) {
        if (circle !== _this) {
          // detect collision with another circle
          if (calculateDistance(circle, _this) <= circle.radius + _this.radius) {
            _this.changeDirectionX();
            _this.changeDirectionY();
          }

          // draw the link between circles if in range
          if (calculateDistance(circle, _this) <= circle.radius + _this.radius + linkDistance) {
            drawLink(_this, circle);
          }
        }
      });

      if (this.x + this.direction.dirX + this.radius >= width || this.x + this.direction.dirX - this.radius <= 0) {
        this.changeDirectionX();
      }

      if (this.y + this.direction.dirY + this.radius >= height || this.y + this.direction.dirY - this.radius <= 0) {
        this.changeDirectionY();
      }

      this.x += this.direction.dirX;
      this.y += this.direction.dirY;

      ctx.lineWidth = 3;
      this.render(canvas, ctx);
      ctx.fill();
    }

    // render the circle

  }, {
    key: 'render',
    value: function render(c, context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.stroke();
    }
  }]);

  return Circle;
}();

//------------------------------------------------------
// -----------------Circle Generators-------------------
//------------------------------------------------------

// generate single circle


function createCircle(number) {
  return new Circle({
    id: number,
    x: Math.floor(Math.random() * (width - maxCircleRadius) + maxCircleRadius),
    y: Math.floor(Math.random() * (height - maxCircleRadius) + maxCircleRadius),
    radius: Math.floor(Math.random() * maxCircleRadius + minCircleRadius),
    direction: { dirX: Math.random() * animationSpeed, dirY: Math.random() * animationSpeed }
  });
}

// generate given number of circles
function generate(elements) {
  var circles = [];

  for (var i = 0; i < elements; i += 1) {
    circles.push(i);
  }

  circles.forEach(function (element) {
    var id = element;
    var circle = createCircle(id);

    circles.forEach(function (check) {
      if (check !== circle && (typeof check === 'undefined' ? 'undefined' : _typeof(check)) === 'object') {
        while (calculateDistance(circle, check) <= circle.radius + check.radius) {
          circle = createCircle(id);
        }
      }
    });
    circles[id] = circle;
  });

  return circles;
}

//------------------------------------------------------
// -----------------Animation---------------------------
//------------------------------------------------------

// generate circles array
var circles = generate(circlesNumber);

// animate circles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function (circle) {
    circle.move(circles);
  });
}

animate();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);