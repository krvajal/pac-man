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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
// COMMENT: this function is shit, there is much better
// way to do it and the regex have a lot of edge cases
// where it fails
function urlQueryParameter(name) {
  // https://stackoverflow.com/a/47566165/4586108
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  return results[1] || 0;
}




var foreground = document.getElementById("pacman-canvas-foreground");
var background = document.getElementById("pacman-canvas-background");

// define the map we are going to use in the game.
var pacmanMapName = urlQueryParameter("map") || _maps__WEBPACK_IMPORTED_MODULE_0__["default"].OriginalMap;
var pacmanMap = _maps__WEBPACK_IMPORTED_MODULE_0__["default"][pacmanMapName];

var R = pacmanMap.length,
  C = pacmanMap[0].length;

// limit canvas dimensions to [1000 x 1000]
const dimensionH = Math.floor((screen.height - $(".status").height()) / R);
const dimensionW = Math.floor(screen.width / C);
// `dimension` must to be multiple of 6 because ghosts moves with speed
// equal to 2 and PacMan with speed equal to 3.
var dimension = Math.min(dimensionW, dimensionH);
while ((dimension * R) % 6 !== 0 || (dimension * C) % 6 !== 0) dimension -= 1;
// adjust foreground|background canvas dimensions
$(foreground).attr("height", dimension * R);
$(background).attr("height", dimension * R);
$(foreground).attr("width", dimension * C);
$(background).attr("width", dimension * C);
// set the height for canvas-container to allow status-holder to
// display information about the game right bellow the canvas.
$(".canvas-container").css("height", `${dimension * R}px`);

// create and start the game.
var game = new _game__WEBPACK_IMPORTED_MODULE_1__["Game"](3, pacmanMap, pacmanMapName, foreground, background);
game.start();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
// This file describes maps for PacMan. A map is a matrix of character
// where everyone represents something in the real board. The following
// list will describe each element in the map:
//
// +-------------------------------------------------------------------+
// | CHARACTER |     NAME     |               DESCRIPTION              |
// +-----------+--------------+----------------------------------------+
// |           |              | This represent a wall, neither the     |
// |     #     |     Wall     | PacMan nor the ghosts can can pass     |
// |           |              | through it.                            |
// +-----------+--------------+----------------------------------------+
// |           |              | The goal of the game is to accumulate  |
// |     .     |    Pac-Dot   | points by eating all the Pac-Dots in   |
// |           |              | the maze.                              |
// +-----------+--------------+----------------------------------------+
// |           |              | Represent a "Power Pellet" that provide|
// |     *     | Power Pellet | Pac-Man with the temporary ability to  |
// |           |              | eat the ghosts and earn bonus points   |
// +-----------+--------------+----------------------------------------+
// |   SPACE   |  Empty Block | A space that every one can pass through|
// +-----------+--------------+----------------------------------------+
// |     0     |   Red ghost  | Red ghost                              |
// +-----------+--------------+----------------------------------------+
// |     1     |  Green ghost | Green ghost                            |
// +-----------+--------------+----------------------------------------+
// |     2     |  Blue ghost  | Blue ghost                             |
// +-----------+--------------+----------------------------------------+
// |     3     | Purple ghost | Purple ghost                           |
// +-----------+--------------+----------------------------------------+
// |     p     |    PacMan    | PacMan                                 |
// +-----------+--------------+----------------------------------------+
// |     b     |    Base      | This position is where dead ghosts must|
// |           |              | return to.                             |
// +-----------+--------------+----------------------------------------+
//

var OriginalMap = [
  "############################",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#*####.#####.##.#####.####*#",
  "#.####.#####.##.#####.####.#",
  "#..........................#",
  "#.####.##.########.##.####.#",
  "#.####.##.########.##.####.#",
  "#......##....##....##......#",
  "######.#####.##.#####.######",
  "######.#####.##.#####.######",
  "######.##    0     ##.######",
  "######.## ###--### ##.######",
  "######.## ###  ### ##.######",
  "      .   ##1b23##   .      ",
  "######.## ######## ##.######",
  "######.## ######## ##.######",
  "######.##          ##.######",
  "######.## ######## ##.######",
  "######.## ######## ##.######",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#.####.#####.##.#####.####.#",
  "#*..##........p.......##..*#",
  "###.##.##.########.##.##.###",
  "###.##.##.########.##.##.###",
  "#......##....##....##......#",
  "#.##########.##.##########.#",
  "#.##########.##.##########.#",
  "#..........................#",
  "############################"
];

var IronHackMap = [
  "##############.###############.##########",
  "#.......................................#",
  "#.#####...........................#####.#",
  "#...#...............................#...#",
  "#...#..#######.#.#####.#######.#....#...#",
  "#...#..........#....*#.#..*..#.####.#...#",
  "#...#..###.###.#.###.#.#.###.#.#*.#.#...#",
  "#........#.#...#.....#.#.# #.#.#..#.....#",
  "#........#*#...#.#####.#.# #.#.#..#.....#",
  "#......###.###.#.#.....#.# #.#.#..#.....#",
  "#..............#.#####.#.###.#.#..#.....#",
  "#......#######.#.....#.#.....#.#..#.....#",
  "....................p....................",
  "#......#.#.#.#.#######.#######.#.#......#",
  "#......#.#.#.#.#.....#.#.......#.#......#",
  "#......#.#.#.#.#.###.#.#.#####.#.#......#",
  "#......#.###.#.#.#*#.#.#.#.....#*#......#",
  "#......#..*..#.#.....#.#*#.....####.....#",
  "#......#.###.#.#.###.#.#.#####.#..#.....#",
  "#......#.#.#.#.#.#.#.#.#.......#..#.....#",
  "#......#.#.#.#.#.#.#.#.#######.#..#.....#",
  "#...#...............................#...#",
  "#.#####...........................#####.#",
  "#................###-###................#",
  "#................#01b23#................#",
  "##############.###############.##########"
];

/* harmony default export */ __webpack_exports__["default"] = ({
  IronHackMap: IronHackMap,
  OriginalMap
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_stats__WEBPACK_IMPORTED_MODULE_4__);





console.log(_characters__WEBPACK_IMPORTED_MODULE_3__["Pacman"]);

function Game(
  lives,
  board,
  boardName,
  foregroundCanvas,
  backgroundCanvas
) {
  var self = this;

  this.score = 0;
  this.lives = lives;
  this.board = board;
  this.boardName = boardName;
  this.pacman;
  this.ghosts = [];
  this.score = 0;
  this.pacmanDistances;
  this.ghostBaseDistance;
  this.scoreByEatingGhost = 200;

  this.R = board.length;
  this.C = board[0].length;

  this.animationTicks = 0;

  this.baseR;
  this.baseC;

  this.floatingScoreTexts = [];

  // time control
  this.previousFrame;
  this.totalTime = 0;
  this.sTime = Date.now();
  this.eTime = Date.now();

  // store all related with the canvas
  this.canvas = foregroundCanvas;
  this.cellW = foregroundCanvas.width / this.C;
  this.cellH = foregroundCanvas.height / this.R;
  this.context = foregroundCanvas.getContext("2d");

  this.getRow = function(character) {
    return (Math.round(character.y / this.cellH) + self.R) % self.R;
  };

  this.getCol = function(character) {
    return (Math.round(character.x / this.cellW) + self.C) % self.C;
  };

  // running | over
  this.status = "running";

  // add lives to the DOM
  for (var i = 0; i < lives; i++)
    $("#lives").append('<img src="assets/hearth.png">');

  this.board = board.map(function(row) {
    return row.split("");
  });

  for (var i = 0; i < this.R; i++)
    for (var j = 0; j < this.C; j++) {
      var x = j * this.cellW;
      var y = i * this.cellH;
      if (this.board[i][j] === "p") {
        this.pacman = new _characters__WEBPACK_IMPORTED_MODULE_3__["Pacman"](x, y, this.cellW, this.cellH);
      }
      if (this.board[i][j] === "b") {
        this.baseR = i;
        this.baseC = j;
      }
      if ("0123456789".indexOf(board[i][j]) !== -1)
        this.ghosts.push(
          new _characters__WEBPACK_IMPORTED_MODULE_3__["Ghost"](x, y, this.cellW, this.cellH, this.board[i][j] % 4)
        );
    }

  this.ghostBaseDistance = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["BFS"])(this.baseR, this.baseC, this.board, "#");

  document.onkeydown = function(event) {
    if (37 <= event.which && event.which <= 40) {
      if (event.which === 37) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["LEFT"];
      else if (event.which == 38) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["UP"];
      else if (event.which == 39) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["RIGHT"];
      else if (event.which == 40) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["DOWN"];
      event.preventDefault();
    }
  };

  // touch zone
  let touchStartX = 0,
    touchEndX = 0;
  let touchstartY = 0,
    touchEndY = 0;

  function handleGesture() {
    var dx = self.touchEndX - self.touchStartX;
    var dy = self.touchEndY - self.touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["LEFT"];
      else self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["RIGHT"];
    } else {
      if (dy < 0) self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["UP"];
      else self.pacman.nextDirection = _utils__WEBPACK_IMPORTED_MODULE_2__["DOWN"];
    }
  }

  self.canvas.addEventListener(
    "touchstart",
    function(event) {
      self.touchStartX = event.changedTouches[0].screenX;
      self.touchStartY = event.changedTouches[0].screenY;
    },
    false
  );

  self.canvas.addEventListener(
    "touchmove",
    function(event) {
      event.preventDefault();
    },
    false
  );

  self.canvas.addEventListener(
    "touchend",
    function(event) {
      self.touchEndX = event.changedTouches[0].screenX;
      self.touchEndY = event.changedTouches[0].screenY;
      handleGesture();
    },
    false
  );

  // touch zone

  this.canMove = function(character, direction) {
    if (character.x % this.cellW === 0 && character.y % this.cellH === 0) {
      var r =
        (this.getRow(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][direction][0] + self.R) % self.R;
      var c =
        (this.getCol(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][direction][1] + self.C) % self.C;
      if (board[r][c] !== "#")
        return character.name === "ghost" || !"#|-".includes(board[r][c]);
      return false;
    }
    return character.direction === direction;
  };

  this.move = function(character) {
    if (character.name === "ghost") {
      var altDirections = [];

      if (character.status === "scatter") {
        if (this.canMove(character, character.direction))
          altDirections.push(character.direction);
        if (character.direction === _utils__WEBPACK_IMPORTED_MODULE_2__["UP"] || character.direction === _utils__WEBPACK_IMPORTED_MODULE_2__["DOWN"]) {
          if (this.canMove(character, 2)) altDirections.push(2);
          if (this.canMove(character, 3)) altDirections.push(3);
        } else {
          if (this.canMove(character, 0)) altDirections.push(0);
          if (this.canMove(character, 1)) altDirections.push(1);
        }
        if (altDirections.length === 0)
          altDirections.push(character.direction ^ 1);
      }

      if (character.status === "chase") {
        var bestDistance = -1;
        for (var i = 0; i < _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"].length; i++)
          if (this.canMove(character, i)) {
            var r =
              (this.getRow(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][0] + self.R) % self.R;
            var c =
              (this.getCol(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][1] + self.C) % self.C;
            if (
              bestDistance === -1 ||
              bestDistance > this.pacmanDistances[r][c]
            ) {
              bestDistance = this.pacmanDistances[r][c];
              altDirections = [i];
            } else if (bestDistance === this.pacmanDistances[r][c])
              altDirections.push(i);
          }
      }

      if (character.status === "afraid") {
        var bestDistance = -1;
        for (var i = 0; i < _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"].length; i++)
          if ((i ^ 1) != character.direction && this.canMove(character, i)) {
            var r =
              (this.getRow(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][0] + self.R) % self.R;
            var c =
              (this.getCol(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][1] + self.C) % self.C;
            if (
              bestDistance === -1 ||
              bestDistance < this.pacmanDistances[r][c]
            ) {
              bestDistance = this.pacmanDistances[r][c];
              altDirections = [i];
            } else if (bestDistance === this.pacmanDistances[r][c]) {
              altDirections.push(i);
            }
          }
        if (altDirections.length === 0)
          altDirections.push(character.direction ^ 1);
      }

      if (character.status === "dead") {
        var bestDistance = -1;
        for (var i = 0; i < _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"].length; i++)
          if (this.canMove(character, i)) {
            var r =
              (this.getRow(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][0] + self.R) % self.R;
            var c =
              (this.getCol(character) + _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS"][i][1] + self.C) % self.C;
            if (
              bestDistance === -1 ||
              bestDistance > this.ghostBaseDistance[r][c]
            ) {
              bestDistance = this.ghostBaseDistance[r][c];
              altDirections = [i];
            } else if (bestDistance === this.ghostBaseDistance[r][c])
              altDirections.push(i);
          }
      }

      if (altDirections.length > 0)
        character.direction =
          altDirections[Math.floor(Math.random() * altDirections.length)];
    }

    if (
      character.name === "pacman" &&
      this.canMove(character, character.nextDirection)
    )
      character.direction = character.nextDirection;

    if (this.canMove(character, character.direction)) {
      var speed = 2;
      if (character.name === "pacman") speed = 3;
      character.x += speed * _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS_PIXEL"][character.direction][0];
      character.y += speed * _utils__WEBPACK_IMPORTED_MODULE_2__["DIRECTIONS_PIXEL"][character.direction][1];

      if (character.x < 0) character.x = self.canvas.width;
      if (character.x > self.canvas.width) character.x = 0;
      if (character.y < 0) character.y = self.canvas.height;
      if (character.y > self.canvas.height) character.y = 0;
    }
  };

  this.collide = function(character1, character2) {
    var x1 = Math.max(character1.x, character2.x);
    var x2 = Math.min(
      character1.x + character1.width,
      character2.x + character2.width
    );
    var y1 = Math.max(character1.y, character2.y);
    var y2 = Math.min(
      character1.y + character1.height,
      character2.y + character2.height
    );
    var dx = Math.max(0, x2 - x1);
    var dy = Math.max(0, y2 - y1);
    return dx * dy > 0.2 * (character1.width * character1.height);
  };

  this.moveAll = function() {
    this.pacmanDistances = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["BFS"])(
      this.getRow(this.pacman),
      this.getCol(this.pacman),
      this.board,
      "#"
    );

    this.ghosts.forEach(function(ghost) {
      self.move(ghost);
      if (self.collide(ghost, self.pacman)) {
        if (ghost.isDangerous()) {
          self.status = "over";
          self.eTime = Date.now();
        } else if (ghost.status === "afraid") {
          ghost.setStatus("dead");
          self.score += self.scoreByEatingGhost;
          self.floatingScoreTexts.push({
            text: self.scoreByEatingGhost,
            time: Date.now(),
            x: ghost.x + self.cellW,
            y: ghost.y + self.cellH
          });
          self.scoreByEatingGhost *= 2;
          _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanEatghostAudio.play();
        }
      }
      if (self.getRow(ghost) === self.baseR)
        if (self.getCol(ghost) === self.baseC) {
          if (ghost.status === "dead") ghost.setStatus("chase");
        }
    });

    if (this.status === "running") {
      this.move(this.pacman);
      var r = this.getRow(this.pacman);
      var c = this.getCol(this.pacman);
      var u = this.board[r][c];
      if (u === "." || u === "*") {
        if (u === ".") {
          this.score += 10;
          _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanChompAudio.play();
        } else if (u === "*") {
          this.score += 50;
          self.scoreByEatingGhost = 200;
          this.ghosts.forEach(function(ghost) {
            if (ghost.status !== "dead") {
              ghost.setStatus("afraid");
              ghost.direction ^= 1;
            }
          });
        }
        this.board[r][c] = " ";
      }
    }

    $("#score").html(this.score);
  };

  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drawBackground"])(backgroundCanvas, board);

  this.draw = function() {
    this.animationTicks += 1;

    var ctx = this.context;

    if (self.status === "running") {
      if (self.previousFrame) {
        self.totalTime += Date.now() - self.previousFrame;
      }
    }

    self.previousFrame = Date.now();

    // change ghosts status
    if (this.status === "running") {
      var now = Date.now();
      this.ghosts.forEach(function(ghost) {
        var statusSince = ghost.getStatusSince();
        if (ghost.status === "scatter" && now - statusSince > 5000)
          ghost.setStatus("chase");
        else if (ghost.status === "chase" && now - statusSince > 10000)
          ghost.setStatus("scatter");
        else if (ghost.status === "afraid" && now - statusSince > 7000)
          ghost.setStatus("scatter");
      });

      if (this.status === "running") this.moveAll();
    }

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var dots = 0;
    for (var i = 0; i < this.R; i++)
      for (var j = 0; j < this.C; j++) {
        if (this.board[i][j] === ".") {
          ctx.fillStyle = "#ff0000";
          var x = j * this.cellW;
          var y = i * this.cellH;
          var margin = 2;
          ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].dotS, x, y, this.cellW, this.cellH);
          dots += 1;
        } else if (this.board[i][j] === "*") {
          ctx.fillStyle = "#00ff00";
          var x = j * this.cellW;
          var y = i * this.cellH;
          var margin = 2;
          var frame = Math.floor(this.animationTicks / 10);
          if (frame % 4 === 0) {
            ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].dotS, x, y, this.cellW, this.cellH);
          } else if (frame % 4 == 1) {
            ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].dotM, x, y, this.cellW, this.cellH);
          } else if (frame % 4 == 2) {
            ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].dotB, x, y, this.cellW, this.cellH);
          } else if (frame % 4 == 3) {
            ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].dotM, x, y, this.cellW, this.cellH);
          }
          dots += 1;
        }
      }

    this.ghosts.forEach(function(ghost) {
      ghost.draw(ctx, self);
    });
    this.pacman.draw(ctx, self);

    if (this.floatingScoreTexts) {
      var newFloatingScoreTexts = [];
      this.floatingScoreTexts.forEach(function(floatingText) {
        self.context.font = "16px Bangers";
        self.context.fillStyle = "white";
        self.context.textAlign = "center";
        self.context.fillText(
          floatingText.text,
          floatingText.x,
          floatingText.y
        );
        if (Date.now() - floatingText.time < 2000)
          newFloatingScoreTexts.push(floatingText);
      });
      this.floatingScoreTexts = newFloatingScoreTexts;
    }

    if (dots === 0 && this.status === "running") {
      this.status = "player-won";
      var name = prompt(`You win, enter your name - Score = ${self.score}`);
      postGameStats(name, self, function() {
        window.location.reload();
      });
    }

    if (this.status === "over") {
      self.over();
    }

    if (this.status === "starting") {
      this.context.font = "32px Bangers";
      this.context.fillStyle = "white";
      this.context.textAlign = "center";
      this.context.fillText(
        "Get ready!",
        this.canvas.width / 2,
        this.canvas.height / 2 + 20
      );
    }

    requestAnimationFrame(function() {
      self.draw();
    });
  };

  this.over = function() {
    self.status = "playing-death-audio";

    _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanDeathAudio.play();
    _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanDeathAudio.onended = function() {
      self.lives -= 1;
      $($("#lives img")[0]).remove();
      if (self.lives > 0) {
        self.status = "starting";
        self.pacman.restart();
        self.ghosts.forEach(function(ghost) {
          ghost.restart();
        });
        setTimeout(function() {
          self.status = "running";
        }, 2000);
      } else {
        var name = prompt(`Game Over, enter your name - Score = ${self.score}`);
        postGameStats(name, self, function() {
          window.location.reload();
        });
      }
    };
  };

  this.start = function() {
    this.status = "starting";
    this.draw();
    var promise = _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanBeginningAudio.play();
    if (promise !== undefined) {
      promise.then(
        function() {
          _sounds__WEBPACK_IMPORTED_MODULE_1__["default"].pacmanBeginningAudio.onended = function() {};
        },
        function(error) {
          console.log("not autoplay allowed");
        }
      );
    }
    self.status = "running";
  };
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dotB = new Image();
var dotM = new Image();
var dotS = new Image();

dotB.src = "assets/dotb.png";
dotM.src = "assets/dotm.png";
dotS.src = "assets/dots.png";

// pacmanImages[dir][frame]
var pacmanImages = {};
[0, 1, 2, 3].forEach(function(dir) {
  pacmanImages[dir] = {};
  for (var frame = 0; frame < 4; frame++) {
    pacmanImages[dir][frame] = new Image();
    pacmanImages[dir][frame].src = `assets/pacman/${dir}/pacman.${frame}.png`;
  }
});

// ghostImages[id][dir][frame]
var ghostImages = {};
[0, 1, 2, 3].forEach(function(id) {
  ghostImages[id] = {};
  [0, 1, 2, 3].forEach(function(dir) {
    ghostImages[id][dir] = {};
    for (var frame = 0; frame < 2; frame++) {
      ghostImages[id][dir][frame] = new Image();
      ghostImages[id][dir][
        frame
      ].src = `assets/ghost/${id}/${dir}.${frame}.png`;
    }
  });
});

var gDead0 = new Image();
var gDead1 = new Image();
gDead0.src = "assets/ghost/dead.0.png";
gDead1.src = "assets/ghost/dead.1.png";

var gAfraid0 = new Image();
var gAfraid1 = new Image();
gAfraid0.src = "assets/ghost/afraid.0.png";
gAfraid1.src = "assets/ghost/afraid.1.png";

/* harmony default export */ __webpack_exports__["default"] = ({
  dotB: dotB,
  dotM: dotM,
  dotS: dotS,
  gDead0: gDead0,
  gDead1: gDead1,
  gAfraid0: gAfraid0,
  gAfraid1: gAfraid1,
  pacmanImages: pacmanImages,
  ghostImages: ghostImages
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var pacmanChompAudio = new Audio("assets/sounds/pacman_chomp.wav");
var pacmanEatghostAudio = new Audio("assets/sounds/pacman_eatghost.wav");
var pacmanBeginningAudio = new Audio("assets/sounds/pacman_beginning.wav");
var pacmanDeathAudio = new Audio("assets/sounds/pacman_death.wav");

/* harmony default export */ __webpack_exports__["default"] = ({
  pacmanChompAudio: pacmanChompAudio,
  pacmanEatghostAudio: pacmanEatghostAudio,
  pacmanBeginningAudio: pacmanBeginningAudio,
  pacmanDeathAudio: pacmanDeathAudio
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UP", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOWN", function() { return DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS_PIXEL", function() { return DIRECTIONS_PIXEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMatrix", function() { return createMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BFS", function() { return BFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawBackground", function() { return drawBackground; });
const DIRECTIONS = [
  [-1, 0], // up
  [+1, 0], // down
  [0, -1], // left
  [0, +1] // right
];

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const DIRECTIONS_PIXEL = [
  [0, -1], // up
  [0, +1], // down
  [-1, 0], // left
  [+1, 0] // right
];

function createMatrix(R, C, defaultValue) {
  var result = [];
  for (var i = 0; i < R; i++) {
    var row = [];
    for (var j = 0; j < C; j++) row.push(defaultValue);
    result.push(row);
  }
  return result;
}

function BFS(r, c, board, blockedCells) {
  var R = board.length;
  var C = board[0].length;
  var distances = createMatrix(R, C, -1);
  distances[r][c] = 0;
  var queue = [[r, c]];
  while (queue.length > 0) {
    var [r, c] = queue.shift();
    for (var i = 0; i < DIRECTIONS.length; i++) {
      var nextR = (r + DIRECTIONS[i][0] + R) % R;
      var nextC = (c + DIRECTIONS[i][1] + C) % C;
      if (
        !blockedCells.includes(board[nextR][nextC]) &&
        distances[nextR][nextC] === -1
      ) {
        distances[nextR][nextC] = distances[r][c] + 1;
        queue.push([nextR, nextC]);
      }
    }
  }
  return distances;
}

function drawBackground(canvas, board) {
  var R = board.length,
    C = board[0].length;
  var cellW = canvas.width / C;
  var cellH = canvas.height / R;
  var ctx = canvas.getContext("2d");
  var lines = [];
  for (var i = 0; i < R; i++)
    for (var j = 0; j < C; j++)
      if (board[i][j] === "#") {
        if (i - 1 === -1 || board[i - 1][j] !== "#")
          lines.push({
            x1: j * cellW,
            y1: i * cellH,
            x2: (j + 1) * cellW,
            y2: i * cellH,
            color: "#0033ff"
          });

        if (i + 1 === R || board[i + 1][j] !== "#")
          lines.push({
            x1: j * cellW,
            y1: (i + 1) * cellH,
            x2: (j + 1) * cellW,
            y2: (i + 1) * cellH,
            color: "#0033ff"
          });

        if (j - 1 === -1 || board[i][j - 1] !== "#")
          lines.push({
            x1: j * cellW,
            y1: i * cellH,
            x2: j * cellW,
            y2: (i + 1) * cellH,
            color: "#0033ff"
          });

        if (j + 1 === C || board[i][j + 1] !== "#")
          lines.push({
            x1: (j + 1) * cellW,
            y1: i * cellH,
            x2: (j + 1) * cellW,
            y2: (i + 1) * cellH,
            color: "#0033ff"
          });
      } else if (board[i][j] === "-") {
        lines.unshift({
          x1: j * cellW,
          y1: (i + 1) * cellH - cellH / 2,
          x2: (j + 1) * cellW,
          y2: (i + 1) * cellH - cellH / 2,
          color: "#ffffff"
        });
      }

  for (let { x1, y1, x2, y2, color } of lines) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ghost", function() { return Ghost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pacman", function() { return Pacman; });
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


function Ghost(x, y, width, height, id) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.id = id;
  this.originalX = x;
  this.originalY = y;
  this.name = "ghost";
  this.direction = Math.floor(Math.random() * 4);
  // dead | scatter | chase | afraid
  this.status = "scatter";
  this.statusSince;
  this.draw = function(ctx, game) {
    var ticks = Math.floor(game.animationTicks / 10);
    var image;
    if (this.status === "afraid") {
      if (ticks % 2 === 0) image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].gAfraid0;
      else image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].gAfraid1;
    } else if (this.status === "dead") {
      if (this.y > game.pacman.y) image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].gDead0;
      else image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].gDead1;
    } else {
      image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].ghostImages[this.id % 4][this.direction][ticks % 2];
    }
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  };
  this.isDangerous = function() {
    return this.status === "scatter" || this.status === "chase";
  };
  this.isPassive = function() {
    return this.status === "dead" || this.status === "afraid";
  };
  this.restart = function() {
    this.x = this.originalX;
    this.y = this.originalY;
    this.setStatus("scatter");
  };

  this.getStatusSince = function() {
    if (!this.statusSince) this.statusSince = Date.now();
    return this.statusSince;
  };

  this.setStatus = function(status) {
    if (status !== this.status || status === "afraid") {
      this.status = status;
      this.statusSince = Date.now();
    }
  };
}

function Pacman(x, y, width, height) {
  this.x = x;
  this.y = y;

  this.originalX = x;
  this.originalY = y;

  this.width = width;
  this.height = height;

  this.name = "pacman";

  this.direction = 2;
  this.nextDirection = 2;

  this.draw = function(ctx, game) {
    var ticks = Math.floor(game.animationTicks / 5);
    var image = _images__WEBPACK_IMPORTED_MODULE_0__["default"].pacmanImages[this.direction][ticks % 4];
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  };

  this.restart = function() {
    this.x = this.originalX;
    this.y = this.originalY;
    this.direction = 2;
    this.nextDirection = 2;
  };
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var token = 'e472b4b5-f572-4ceb-87c2-8bd313e69ac5';

function postGameStats(name, game, callback) {
    if (name) {
        $.post('https://isureit.com/api/bd/', {
            token: token,
            value: JSON.stringify({
                name: name,
                score: game.score,
                won: (game.status === 'player-won'),
                lives: game.lives,
                time: game.totalTime,
                sTime: game.sTime,
                eTime: game.eTime,
                board: game.boardName
            })
        }, function () {
            callback();
        });
    } else {
        callback();
    }
}

function setGameStats(holder, limit) {
    $.getJSON('https://isureit.com/api/bd/', { token: token })
        .done(function (response) {
            response.data.sort(function (a, b) {
                return b.score - a.score;
            });
            var $thead = $('<thead></thead>');
            var $tbody = $('<tbody></tbody>');
            $thead.append(`<tr><th>Rank</th><th>Name</th><th>Score</th><th>Time (s)</th><th>Map</th></tr>`);
            response.data.slice(0, limit || 10).forEach(function (row, index) {
                var time = Math.floor(row.time / 1000) || '-';
                var boardName = row.board || '-';
                $tbody.append(
                    `<tr><td>${index + 1}</td><td>${row.name}</td><td>${row.score}</td><td>${time}</td><td>${boardName}</td></tr>`
                );
            });
            $(holder).html('').append(
                $('<table></table>').append($thead).append($tbody)
            );
        }).fail(function () {
            $(holder).html('Unable to access the server now!');
        });
}

/***/ })
/******/ ]);