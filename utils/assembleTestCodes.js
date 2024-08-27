const assemblePlaywrightTestCodes = (testCode) => {
  const formattedTestCodes = testCode.join("");

  return formattedTestCodes
    .split(";")
    .filter(Boolean)
    .map((part) => {
      if (part.includes(".to")) {
        const locatorIndex = part.indexOf("locator");

        if (locatorIndex !== -1) {
          const endLocatorIndex = part.indexOf(
            ".",
            locatorIndex + ".locator".length,
          );
          const locatorPart = part.substring(locatorIndex, endLocatorIndex);
          const restOfPart =
            endLocatorIndex !== -1 ? part.substring(endLocatorIndex) : "";

          return `    await expect(${locatorPart}${restOfPart});`;
        }
        return `    await expect(page)${part};`;
      }
      return `    await page${part};`;
    })
    .join("\n");
};

module.exports = assemblePlaywrightTestCodes;
