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

module.exports = Block;