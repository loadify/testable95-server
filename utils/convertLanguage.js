const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertNaturalLanguageToCodes = async (messages) => {
  const playwrightCodeTemp = messages.map(async (message) => {
    try {
      const response = await client.message(message);
      const intent = response.intents[0]?.name;
      const entity =
        response.entities["URL:URL"]?.[0]?.value ||
        response.entities["attribute:value"]?.[0]?.value;

      if (!intent || !entity) {
        return "";
      }

      if (intent === "id") {
        return `.locator("#${entity}")`;
      }

      return `.${intent}(${entity});`;
    } catch (error) {
      console.error(error);
      return "";
    }
  });

  return Promise.all(playwrightCodeTemp);
};

module.exports = convertNaturalLanguageToCodes;
