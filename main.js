"use strict";

const SHA256 = require("crypto-js/sha256");

class Block {
  /**
   *Creates an instance of Block.
   * @param {string} timestamp tells us when the block was created
   * @param {any} data that you want to associate with this block
   * @param {string} [previousHash=""] contains the hash of the previous block
   * @memberof Block
   */
  constructor(timestamp, data, previousHash = "") {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  /**
   *Creates an instance of Blockchain.
   * @memberof Blockchain
   */
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block("01/01/2018", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    // The new block needs to point to the hash of the latest block on the chain.
    newBlock.previousHash = this.getLatestBlock().hash;

    // Calculate the hash of the new block
    newBlock.hash = newBlock.calculateHash();

    // Now the block is ready and can be added to chain!
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Recalculate the hash of the block and see if it matches up.
      // This allows us to detect changes to a single block
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if this block actually points to the previous block (hash)
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    // Check the genesis block
    if (this.chain[0].toString() !== this.createGenesisBlock().toString()) {
      return false;
    }

    // If we managed to get here, the chain is valid!
    return true;
  }
}

// TESTS

console.log("Creating a chain w/ 2 blocks and checking its integrity...");

let manuCoin = new Blockchain();

manuCoin.addBlock(new Block("20/07/2018", { amount: 4 }));
manuCoin.addBlock(new Block("22/07/2018", { amount: 10 }));

console.log(JSON.stringify(manuCoin, null, 4));
console.log("Blockchain valid?: " + manuCoin.isChainValid());

console.log("Changing a block...");

// Tamper with the chain!
manuCoin.chain[1].data = { amount: 25 };

// Recalculate its hash, to make everything appear to be in order!
manuCoin.chain[1].hash = manuCoin.chain[1].calculateHash();

console.log("Blockchain valid?: " + manuCoin.isChainValid());
