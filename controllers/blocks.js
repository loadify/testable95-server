const createError = require("http-errors");

const processNaturalLanguage = require("../services/api");
const { processLineBlocks, processTestCodes } = require("../utils/utils");

const TEST_CODE_TEMPLATE = `
const { chromium } = require("playwright");
(async () => {
  try {
    %TEST_CODE%
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
`.trim();

const handleBlocks = async (req, res, next) => {
  try {
    const { body: lineBlocks } = req;

    const naturalLanguage = processLineBlocks(lineBlocks);
    const playwrightCode = await processNaturalLanguage(naturalLanguage);
    const playwrightTestCodes = processTestCodes(playwrightCode);

    const formattedTestCodes = TEST_CODE_TEMPLATE.replace(
      "%TEST_CODE%",
      playwrightTestCodes,
    );

    res.json({ formattedTestCodes });
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

module.exports = handleBlocks;
