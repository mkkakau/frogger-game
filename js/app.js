var tileWidth = 101;
var tileHeight = 83;
var offset = 15;

function column(x) {
  return x * tileWidth;
}

function row(y) {
  return y * tileHeight - offset;
}

// Enemies our player must avoid
var Enemy = function(y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  //start enemy off screen
  this.x = column(-1);
  this.y = row(y);
  this.speed = speed * tileWidth;
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
  this.sprite = 'images/char-boy.png'
  this.x = column(2);
  this.y = row(5);
};

Player.prototype.update = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (this.y === allEnemies[i].y) {
      var enemyButt = allEnemies[i].x;
      var enemyHead = allEnemies[i].x + tileWidth;
      if (this.x >=  enemyButt && this.x <= enemyHead) {
        console.log("HIT");
        console.log("Enemy: " + enemyButt + ", " + enemyHead);
        console.log("Player: " + this.x);
        this.resetPlayer();
      }
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > column(0)) {
    this.x = this.x - tileWidth;
  }
  else if (key === 'right' && this.x < column(4)) {
    this.x = this.x + tileWidth;
  }
  else if (key === 'up' && this.y > row(0)) {
    this.y = this.y - tileHeight;
  }
  else if (key === 'down' && this.y < row(5)) {
    this.y = this.y + tileHeight;
  }

  if(this.y === row(0)){
    this.resetPlayer();
  }
};

Player.prototype.resetPlayer = function() {
    this.x = column(2);
    this.y = row(5);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy(1,1);
// allEnemies[1] = new Enemy(2,2);
// allEnemies[2] = new Enemy(3,1.5);
// allEnemies[3] = new Enemy(1,3.5);
// allEnemies[4] = new Enemy(2,1);
// allEnemies[5] = new Enemy(3,.5);

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


