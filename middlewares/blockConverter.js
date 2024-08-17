const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertBlocksToTestCode = async (req, res, next) => {
  try {
    const userInput = req.body.inputData;
    console.log("입력한 input 값", userInput);

    const response = await client.message(userInput, {});

    console.log("wit.ai의 응답", response);

    res.locals.testCode = response;
    next();
  } catch (error) {
    console.error("error:", error);
    next(error);
  }
};

module.exports = convertBlocksToTestCode;
