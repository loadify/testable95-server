const convertBlocksToNaturalLanguage = (lineBlocks) => {
  return lineBlocks.blockData
    .map((lineBlock) => {
      let naturalLanguage = "";
      const blockContents = [];

      lineBlock.blocks.forEach((block) => {
        if (block.parameter === "id (#)") {
          blockContents.push(`id(#) ${block.value}`);
        } else if (block.type === "input") {
          naturalLanguage += `${block.parameter} ${block.value}`;
        } else if (block.type === "method") {
          naturalLanguage += block.method;
          blockContents.push(naturalLanguage);
          naturalLanguage = "";
        }
      });

      return blockContents;
    })
    .flat();
};

module.exports = convertBlocksToNaturalLanguage;
