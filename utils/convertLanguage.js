const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const convertNaturalLanguageToCodes = async (messages) => {
  const playwrightCodeTemp = messages.map(async (message) => {
    try {
      const response = await client.message(message);
      const { intents, entities } = response;
      const intent = intents[0]?.name;
      const entity =
        entities["URL:URL"]?.[0]?.value ||
        entities["attribute:value"]?.[0]?.value;

      if (!intent || !entity) {
        return "코드 변환에 실패하였습니다.";
      }

      if (intent === "id") {
        return `.locator("#${entity}")`;
      }

      return `.${intent}("${entity}");`;
    } catch (error) {
      console.error(error);

      return "";
    }
  });

  return Promise.all(playwrightCodeTemp);
};

module.exports = convertNaturalLanguageToCodes;
