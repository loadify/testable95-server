const { Wit } = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_AI_SERVER_ACCESS_TOKEN,
});

const processNaturalLanguage = async (messages) => {
  const playwrightCodeTemp = messages.map(async (message) => {
    try {
      const response = await client.message(message);
      const { intents, entities } = response;
      const intent = intents[0]?.name;
      const entity =
        entities["URL:URL"]?.[0]?.value ||
        entities["attribute:value"]?.[0]?.value;

      if (!intent) return "코드 변환에 실패하였습니다.";

      const intentActions = {
        click: () => ".click();",
        waitFor: () => ".waitFor();",
        waitForTimeout: () => `.${intent}(${entity});`,
        toBeVisible: () => ".toBeVisible();",
        id: () => `.locator("#${entity}")`,
        class: () => `.locator(".${entity}")`,
      };

      if (intent in intentActions) {
        return intentActions[intent]();
      }

      return `.${intent}("${entity}");`;
    } catch (error) {
      console.error(error);

      return "";
    }
  });

  return Promise.all(playwrightCodeTemp);
};

module.exports = processNaturalLanguage;
