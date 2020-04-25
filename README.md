# TypeChain

Learning TypeScript by making a simple Blockchain with it

## Blockchain

Blockchains are built through a combination of linked list and merkle tree. 
A blockchain is a chain of block linked to one another using linked list structure. 
Instead of traditional pointer that point to next node, blockchain use "previous block's hash" to refer previous block. In this project, we are not implementing merkle tree for simplicity. 

Below how the blockchian is structured. 

![Linked List and Merkle Tree](/Assets/blockchain_structure.png)

### Block Object - Input

 each object takes timestamp and data. 

Timestamp shows when the block was created. It is useful because the system can use this timestamp to rebalance the mininng difficulty every month. 

The other input, Data, holds information stored in the chain. In most of cryptocurrencies, this is where the transaction data is stored in form of merkle tree. 

### Block Object - Data

In each block object, there are 4 more datas, index, previousHash, hash, and nonce. 

Index  - communicate where in the chain the block is located. Remember that "blockchain is implemented as linked list and this index let us know the position of each block in blockchain"

PreviousHash - indicates the hashvalue of previous block in blockchain. Instead of pointer to point next block or previous block in traditional linked list, block chain use previousHash value. 

Hash - hold the result from calculateHash(). 

nonce - it is critical to building in a mining mechanism. 



