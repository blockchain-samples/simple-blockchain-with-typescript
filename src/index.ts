import * as CrpytoJS from "crypto-js"

class Block {
    public index : number;
    public hash : string;
    public previousHash : string;
    public data : string;
    public timestamp : number;
    public nonce : number;

    static calculateBlockHash = (index:number, previousHash:string, timestamp: number, data:string):string  => CrpytoJS.SHA256(index+previousHash+timestamp+data).toString();
    static checkValidBlockStructure = (block : Block) : boolean => {
        return (
            typeof block.index === 'number' && 
            typeof block.hash ==='string' && 
            typeof block.previousHash ==='string' && 
            typeof block.data ==='string' && 
            typeof block.timestamp ==='number' && 
            typeof block.nonce === 'number')
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
        this.nonce = 0;
    }
}


class Blockchain {
    public chain : Block[]
    constructor() {
        this.chain = [this.createGenesis()]
    }
    //blockchain has type of array of blocks. Typescript allows that only "Block" will be added to blockchain
    createGenesis = () : Block =>(new Block(0, "0101010", "", "Genesis Block", 123456))
    
    getLastestBlock = () : Block => this.chain[this.chain.length -1]; 

    getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000)

    createNewBlock = (data : string) : Block=> {
        const previousBlock : Block = this.getLastestBlock()
        const newIndex : number = previousBlock.index + 1
        const nextTimeStamp : number = this.getNewTimeStamp()
        const nextHash : string = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimeStamp, data)
        const newBlock : Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp)
        this.addBlock(newBlock);
        return newBlock
    } 
    
    getHashforABlock = (block : Block) : string => (Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data))
    
    isValidBlock = (candidateBlock:Block , previousBlock: Block) : boolean => {
        if(!Block.checkValidBlockStructure(candidateBlock)) {
            return false;
        } else if(previousBlock.index + 1 !== candidateBlock.index) {
            return false;
        } else if(previousBlock.hash !== candidateBlock.previousHash) {
            return false;
        } else if(this.getHashforABlock(candidateBlock) !== candidateBlock.hash) {
            return false;
        } else {
            return true;
        }
    }
    
    addBlock = (candidateBlock : Block) : void=> {
        if(this.isValidBlock(candidateBlock, this.getLastestBlock())){
            this.chain.push(candidateBlock)
        }
    }
}


export {}