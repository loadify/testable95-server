const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertBlocksToTestCode = async (req, res, next) => {
  try {
    const lineBlocks = req.body;
    const entireBlockForWitAi = [];

    lineBlocks.forEach((lineBlock) => {
      if (lineBlock.data.length === 1) {
        entireBlockForWitAi.push(client.message(lineBlock.data[0], {}));
      } else {
        const blockForWitAi = lineBlock.data.map((block) =>
          client.message(block, {}),
        );
        entireBlockForWitAi.push(...blockForWitAi);
      }
    });

    const keywords = await Promise.all(entireBlockForWitAi);

    res.locals.keywords = keywords;
    next();
  } catch (error) {
    console.error("error:", error);
    next(error);
  }
};

module.exports = convertBlocksToTestCode;
