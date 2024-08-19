const { Wit } = require("node-wit");
const createError = require("http-errors");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const handleBlocks = async (req, res, next) => {
  try {
    const lineBlocks = req.body;
    const messageResponses = lineBlocks.blockData.map(async (lineBlock) => {
      let naturalLanguage = "";

      lineBlock.blocks.forEach((block) => {
        if (block.type === "input") {
          naturalLanguage += `${block.value} ${block.parameter} `;
        } else if (block.type === "method") {
          naturalLanguage += block.method;
        }
      });

      const testCodes = await client.message(naturalLanguage, {});

      return testCodes;
    });

    const keywords = await Promise.all(messageResponses);

    res.json({ keywords });
  } catch (error) {
    console.log(error);

    next(createError(500, "Server Error"));
  }
};

module.exports = handleBlocks;
