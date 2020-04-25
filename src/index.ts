import * as CrpytoJS from "crypto-js"

class Block {
    public index : number;
    public hash : string;
    public previousHash : string;
    public data : string;
    public timestamp : number;

    static calculateBlockHash = (index:number, previousHash:string, timestamp: number, data:string):string  => CrpytoJS.SHA256(index+previousHash+timestamp+data).toString();
    static checkValidBlockStructure = (block : Block) : boolean => {
        return (
            typeof block.index === 'number' && 
            typeof block.hash ==='string' && 
            typeof block.previousHash ==='string' && 
            typeof block.data ==='string' && 
            typeof block.timestamp ==='number')
    }
    constructor(
        index : number,
        hash : string,
        previousHash : string,
        data : string,
        timestamp : number
      ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock:Block = new Block(0, "0101010", "", "Hello world", 123456);

//blockchain has type of array of blocks. Typescript allows that only "Block" will be added to blockchain
let blockChain : Block[] = [genesisBlock];

//this would not able to added
// blockChain.push("string");

const getBlockchain = () : Block[] => blockChain

const getLastestBlock = () : Block => blockChain[blockChain.length -1]; 

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data : string) : Block=> {
        const previousBlock : Block = getLastestBlock()
        const newIndex : number = previousBlock.index + 1
        const nextTimeStamp : number = getNewTimeStamp()
        const nextHash : string = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimeStamp, data)
        const newBlock : Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp)
        addBlock(newBlock);
        return newBlock
} 

const getHashforABlock = (block : Block) : string => (Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data))
const isValidBlock = (candidateBlock:Block , previousBlock: Block) : boolean => {
    if(!Block.checkValidBlockStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if(getHashforABlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock : Block) : void=> {
    if(isValidBlock(candidateBlock, getLastestBlock())){
        blockChain.push(candidateBlock)
    }
}


console.log(createNewBlock("second block"))
console.log(createNewBlock("third block"))
console.log(createNewBlock("fourth block"))
console.log(createNewBlock("fifth block"))


export {}