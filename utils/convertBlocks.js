const separateMethodBlocks = (blocks) => {
  const methodBlocks = [];
  const otherBlocks = [];

  blocks.forEach((block) => {
    if (block.type === "method") {
      methodBlocks.push(block);
    } else {
      otherBlocks.push(block);
    }
  });

  return [...otherBlocks, ...methodBlocks];
};

const formatNaturalLanguage = (blocks) => {
  return blocks.reduce(
    (blockContent, block) => {
      if (block.parameter === "id (#)") {
        blockContent.messages.push(`id(#) ${block.value}`);
      } else if (block.type === "input") {
        blockContent.accumulatedText += `${block.parameter} ${block.value}`;
      } else if (block.type === "method") {
        blockContent.accumulatedText += block.method;
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
      const sortedBlocks = separateMethodBlocks(lineBlock.blocks);
      return formatNaturalLanguage(sortedBlocks);
    })
    .flat();
};

module.exports = convertBlocksToNaturalLanguage;
