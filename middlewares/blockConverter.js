const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertBlocksToTestCode = async (req, res, next) => {
  try {
    const lineBlocks = req.body;
    const messageResponses = [];

    lineBlocks.forEach((lineBlock) => {
      if (lineBlock.data.length === 1) {
        messageResponses.push(client.message(lineBlock.data[0], {}));
      } else {
        const messageResponse = lineBlock.data.map((block) =>
          client.message(block, {}),
        );
        messageResponses.push(...messageResponse);
      }
    });

    const witAiResponses = await Promise.all(messageResponses);

    res.locals.witAiResponses = witAiResponses;
    next();
  } catch (error) {
    console.error("error:", error);
    next(error);
  }
};

module.exports = convertBlocksToTestCode;
