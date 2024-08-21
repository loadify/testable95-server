const convertBlocksToNaturalLanguage = (lineBlocks) => {
  return lineBlocks.blockData
    .map((lineBlock) => {
      const blockContents = lineBlock.blocks.reduce((blockContent, block) => {
        if (block.parameter === "id (#)") {
          blockContent.push(`id(#) ${block.value}`);
        } else if (block.type === "input") {
          blockContent.push(`${block.parameter} ${block.value}`);
        } else if (block.type === "method") {
          blockContent.push(block.method);
        }
        return blockContent;
      }, []);
      return blockContents;
    })
    .flat();
};

module.exports = convertBlocksToNaturalLanguage;
