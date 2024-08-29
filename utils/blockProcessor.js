const separateBlocks = (blocks) => {
  const { methodBlocks, inputBlocks } = blocks.reduce(
    (blockWrapper, block) => {
      blockWrapper[
        block.type === "method" ? "methodBlocks" : "inputBlocks"
      ].push(block);
      return blockWrapper;
    },
    { methodBlocks: [], inputBlocks: [] },
  );
  return [...inputBlocks, ...methodBlocks];
};

const formatNaturalLanguage = (blocks) => {
  return blocks.reduce(
    (blockContent, block) => {
      if (block.parameter === "id (#)") {
        blockContent.messages.push(`id(#) ${block.value}`);
      } else if (block.parameter === "class (.)") {
        blockContent.messages.push(`class(.) ${block.value}`);
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

const processLineBlocks = (lineBlocks) => {
  return lineBlocks.blockData.flatMap((lineBlock) =>
    formatNaturalLanguage(separateBlocks(lineBlock.blocks)),
  );
};

const processTestCodes = (testCode) => {
  const formattedTestCodes = testCode.join("");

  return formattedTestCodes
    .split(";")
    .filter(Boolean)
    .map((part) => {
      if (part.includes(".to")) {
        const locatorIndex = part.indexOf("locator");

        if (locatorIndex !== -1) {
          const endLocatorIndex = part.indexOf(")", locatorIndex);

          const locatorPart = part.substring(locatorIndex, endLocatorIndex + 1);

          const restOfPart =
            endLocatorIndex !== -1 ? part.substring(endLocatorIndex + 1) : "";

          return `    await expect(page.${locatorPart})${restOfPart};`;
        }

        return `    await expect(page)${part};`;
      }
      return `    await page${part};`;
    })
    .join("\n");
};

module.exports = {
  processLineBlocks,
  processTestCodes,
};
