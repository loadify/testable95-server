const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertBlocksToTestCode = async (req, res, next) => {
  try {
    const lineBlocks = req.body;
    const keywordTemp = [];

    lineBlocks.forEach((lineBlock) => {
      if (lineBlock.data.length === 1) {
        keywordTemp.push(client.message(lineBlock.data[0], {}));
      } else {
        const keyword = lineBlock.data.map((block) =>
          client.message(block, {}),
        );
        keywordTemp.push(...keyword);
      }
    });

    const keywords = await Promise.all(keywordTemp);

    res.locals.keywords = keywords;
    next();
  } catch (error) {
    console.error("error:", error);
    next(error);
  }
};

module.exports = convertBlocksToTestCode;
