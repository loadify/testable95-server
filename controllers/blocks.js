const createError = require("http-errors");

const processNaturalLanguage = require("../services/witaiCodeGenerator");
const {
  processLineBlocks,
  processTestCodes,
} = require("../utils/blockProcessor");

const TEST_CODE_TEMPLATE = `
import { test, expect } from "@playwright/test";
test("Login test", async ({ page }) => {

%TEST_CODE%
});
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
