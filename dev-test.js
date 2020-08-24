const Block = require('./bloblock');

const fooBlock = Block.mineBlock(Block.genesis(), 'foo');

console.log(fooBlock.toString());