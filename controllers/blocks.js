const createError = require("http-errors");

const convertBlocksToNaturalLanguage = require("../utils/convertBlocks");
const convertNaturalLanguageToCodes = require("../utils/convertLanguage");
const assemblePlaywrightTestCodes = require("../utils/assembleTestCodes");

const handleBlocks = async (req, res, next) => {
  try {
    const lineBlocks = req.body;

    const naturalLanguage = convertBlocksToNaturalLanguage(lineBlocks);
    const playwrightTestCode =
      await convertNaturalLanguageToCodes(naturalLanguage);
    const formattedTestCodes = assemblePlaywrightTestCodes(playwrightTestCode);

    res.json({ formattedTestCodes });
  } catch (error) {
    console.error(error);
    next(createError(500, "Server Error"));
  }
};

module.exports = handleBlocks;
