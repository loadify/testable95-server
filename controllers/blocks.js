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
    const testCodes = assemblePlaywrightTestCodes(playwrightTestCode);

    const startText = `const { chromium } = require("playwright");\n(async() => { \n  try { \n`;
    const endText =
      "\n    await browser.close();   } catch (error) { \n    console.error(error);   } \n})();";

    const formattedTestCodes = startText + testCodes + endText;

    res.json({ formattedTestCodes });
  } catch (error) {
    console.error(error);
    next(createError(500, "Server Error"));
  }
};

module.exports = handleBlocks;
