"use strict";

const Block = require("./block");

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

module.exports = Blockchain;