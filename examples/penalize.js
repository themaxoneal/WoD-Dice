require('WoD-Dice');

// Construct Pool object
var pool = new Pool(10);

// Penalize against number of dice in Pool
pool.penalty(3);