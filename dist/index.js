"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrpytoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CrpytoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.checkValidBlockStructure = (block) => {
    return (typeof block.index === 'number' &&
        typeof block.hash === 'string' &&
        typeof block.previousHash === 'string' &&
        typeof block.data === 'string' &&
        typeof block.timestamp === 'number');
};
const genesisBlock = new Block(0, "0101010", "", "Hello world", 123456);
//blockchain has type of array of blocks. Typescript allows that only "Block" will be added to blockchain
let blockChain = [genesisBlock];
//this would not able to added
// blockChain.push("string");
const getBlockchain = () => blockChain;
const getLastestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLastestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimeStamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimeStamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforABlock = (block) => (Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data));
const isValidBlock = (candidateBlock, previousBlock) => {
    if (!Block.checkValidBlockStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforABlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isValidBlock(candidateBlock, getLastestBlock())) {
        blockChain.push(candidateBlock);
    }
};
console.log(createNewBlock("second block"));
console.log(createNewBlock("third block"));
console.log(createNewBlock("fourth block"));
console.log(createNewBlock("fifth block"));
//# sourceMappingURL=index.js.map