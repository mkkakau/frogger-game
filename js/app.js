var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var OFFSET = 15;

// converts column number to x-coordinate in pixels
// column(0) is first column, column(-1) is off canvas
function column(x) {
  return x * TILE_WIDTH;
}

// converts rows to y-coordinate in pixels
// row(0) is first row
function row(y) {
  return y * TILE_HEIGHT - OFFSET;
}

// Enemies our player must avoid
var Enemy = function(y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  //start enemy off canvas
  this.x = column(-1);
  this.y = row(y);
  this.speed = speed * TILE_WIDTH;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if (this.x > column(5)) {
    this.x = column(-1);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = column(2);
  this.y = row(5);
  this.wins = 0;
  this.deaths = 0;
  this.score = 0;
};

// Handles collisions and resets on hit
Player.prototype.update = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (this.y === allEnemies[i].y) {
      var enemyButt = allEnemies[i].x;
      var enemyHead = allEnemies[i].x + TILE_WIDTH;
      var playerLeft = this.x + 10;
      var playerRight = this.x + 81;
      if (playerLeft >= enemyButt && playerLeft <= enemyHead) {
        this.die();
      }
      if (playerRight >= enemyButt && playerRight <= enemyHead) {
        this.die();
      }
    }
  }
};

// Renders the player sprite on the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes a key parameter of which direction was pressed
// and moves the player in that direction
// If the player reaches the water (row(0)) calls Player.win() method
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > column(0)) {
    this.x = this.x - TILE_WIDTH;
  }
  else if (key === 'right' && this.x < column(4)) {
    this.x = this.x + TILE_WIDTH;
  }
  else if (key === 'up' && this.y > row(0)) {
    this.y = this.y - TILE_HEIGHT;
  }
  else if (key === 'down' && this.y < row(5)) {
    this.y = this.y + TILE_HEIGHT;
  }

  if (this.y === row(0)) {
    this.win();
  }
};

// Places the player back to start
Player.prototype.resetPlayer = function() {
  this.x = column(2);
  this.y = row(5);
};

// Increments wins and resets player
Player.prototype.win = function() {
  this.wins++;
  document.getElementById('wins').innerHTML = 'Wins: ' + this.wins;
  this.updateScore();
  this.resetPlayer();
};

// Increments deaths and resets player
Player.prototype.die = function() {
  this.deaths++;
  document.getElementById('deaths').innerHTML = 'Deaths: ' + this.deaths;
  this.updateScore();
  this.resetPlayer();
};

Player.prototype.updateScore = function() {
  this.score = this.wins * 10 - this.deaths * 10;
  document.getElementById('score').innerHTML = 'Score: ' + this.score;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy(1,1.2);
allEnemies[1] = new Enemy(2,2.1);
allEnemies[2] = new Enemy(3,1.3);
allEnemies[3] = new Enemy(1,3.6);
allEnemies[4] = new Enemy(2,1.8);
allEnemies[5] = new Enemy(3,0.5);

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
