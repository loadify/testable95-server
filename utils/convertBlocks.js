const separateBlocks = (blocks) => {
  const methodBlocks = [];
  const inputBlocks = [];

  blocks.forEach((block) => {
    if (block.type === "method") {
      methodBlocks.push(block);
    } else {
      inputBlocks.push(block);
    }
  });

  return [...inputBlocks, ...methodBlocks];
};

const formatNaturalLanguage = (blocks) => {
  return blocks.reduce(
    (blockContent, block) => {
      if (block.parameter === "id(#)") {
        blockContent.messages.push(`id(#) ${block.value}`);
      } else if (block.type === "input") {
        blockContent.accumulatedText += `${block.parameter} ${block.value}`;
      } else if (block.type === "method") {
        blockContent.accumulatedText += ` ${block.method}`;
        blockContent.messages.push(blockContent.accumulatedText);
        blockContent.accumulatedText = "";
      }

      return blockContent;
    },
    { accumulatedText: "", messages: [] },
  ).messages;
};

const convertBlocksToNaturalLanguage = (lineBlocks) => {
  return lineBlocks.blockData
    .map((lineBlock) => {
      const sortedBlocks = separateBlocks(lineBlock.blocks);

      return formatNaturalLanguage(sortedBlocks);
    })
    .flat();
};

module.exports = convertBlocksToNaturalLanguage;
