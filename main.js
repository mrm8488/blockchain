"use strict";

const Block = require("./classes/block");
const Blockchain = require("./classes/blockchain");

console.log("Creating a chain w/ 2 blocks and checking its integrity...");

let manuCoin = new Blockchain();

manuCoin.addBlock(new Block("20/07/2018", {
  amount: 4
}));
manuCoin.addBlock(new Block("22/07/2018", {
  amount: 10
}));

console.log(JSON.stringify(manuCoin, null, 4));
console.log("Blockchain valid?: " + manuCoin.isChainValid());

console.log("Changing a block...");

// Tamper with the chain!
manuCoin.chain[1].data = {
  amount: 25
};

// Recalculate its hash, to make everything appear to be in order!
manuCoin.chain[1].hash = manuCoin.chain[1].calculateHash();

console.log("Blockchain valid?: " + manuCoin.isChainValid());