const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertBlocksToTestCode = async (req, res, next) => {
  try {
    const lineBlocks = req.body;
    const witAiRequestPromises = [];

    lineBlocks.forEach((lineBlock) => {
      if (lineBlock.data.length === 1) {
        witAiRequestPromises.push(client.message(lineBlock.data[0], {}));
      } else {
        const blockRequestPromises = lineBlock.data.map((block) =>
          client.message(block, {}),
        );
        witAiRequestPromises.push(...blockRequestPromises);
      }
    });

    const witAiResponses = await Promise.all(witAiRequestPromises);

    res.locals.witAiResponses = witAiResponses;
    next();
  } catch (error) {
    console.error("error:", error);
    next(error);
  }
};

module.exports = convertBlocksToTestCode;
