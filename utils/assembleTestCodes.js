const assemblePlaywrightTestCodes = (testCode) => {
  const formattedTestCodes = testCode.join("");

  return formattedTestCodes
    .split(";")
    .filter(Boolean)
    .map((part) => `    await page${part};`)
    .join("");
};

module.exports = assemblePlaywrightTestCodes;
