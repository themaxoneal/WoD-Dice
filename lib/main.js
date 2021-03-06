/**
 * Selects a random number between 1 and 10
 * 
 * @returns int
 */
function rollDie () {
  return Math.ceil(Math.random() * 10)
}

/**
 * Constructor for Pool object
 * 
 * @param int     dices
 * @param Array   arr
 */
Pool = function(){
  
  // Pool variables  
  this.dices = 0
  this.weak = false
  this.rerollOn = 10
  
  // Checks for arguments, if any
  if (typeof arguments[0] === "number") {
    this.dices = parseInt(arguments[0], 10)
  }
  if (typeof arguments[0] === "object") {
    var config = arguments[0]

    this.dices    = config.dices || this.dices
    this.weak     = config.weak || this.weak
    this.rerollOn = config.rerollOn || this.rerollOn
  }
};

/**
 * Adds the passed integer of dices to the current number in the Pool
 * 
 * @param int     dices
 * @returns int
 */
Pool.prototype.addDice = function (dices) {
  this.dices = this.dices + parseInt(dices, 10)

  return this;
};

/**
 * Removes the passed integer of dices from the current number in the Pool
 * 
 * @param int     dices
 * @returns int
 */
Pool.prototype.removeDice = function (dices) {
  this.dices = this.dices - parseInt(dices, 10)

  return this;
};

/**
 * Penalizes the passed integer of dices on the current Pool
 * 
 * @param int     penalty
 * @returns int
 */
Pool.prototype.penalty = function (penalty) {
  return this.removeDice(penalty)
};

/**
 * Makes the current Pool weak
 * 
 * @returns boolean
 */
Pool.prototype.isWeak = function () {
  this.weak = true

  return this;
};

/**
 * Resets the reroll threshold for current Pool
 * 
 * @param int     threshold
 * @returns int
 */
Pool.prototype.reroll = function (threshold) {
  this.rerollOn = parseInt(threshold, 10)

  return this;
};

/**
 * Asks if there are no dices left for the 'Chance roll'
 * 
 * @returns boolean
 */
Pool.prototype.isChanceRoll = function () {
  return (this.dices < 1)
}

/**
 * Game logic
 * 
 * @returns int
 */
Pool.prototype.roll = function () {
  // Points  
  var successes = 0,
      roll;
  
  // Checks to see if the game is 'over'
  if (this.isChanceRoll()) {
    while (true) {
      roll = rollDie()

      if (roll === 10) {
        successes++
      } else if(roll === 1) {
        successes--
      }
      if (this.weak || roll < 10) {
        break
      }
    }
  // Starts or continues the dice rolling  
  } else {
    for (var i = 0; i < this.dices; i++) {
      roll = rollDie()

      if (roll >= 8) {
        successes++
      }
      if (!this.weak && roll >= this.rerollOn) {
        this.dices++
      }
      if (this.weak && roll === 1) {
        successes--
      }
    }
  }

  return (this.isChanceRoll()) ? successes : Math.max(0, successes);
};

exports.Pool = Pool;
