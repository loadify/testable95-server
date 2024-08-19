const express = require("express");

const convertBlocksToTestCode = require("../middlewares/blockConverter");

const router = express.Router();

router.post("/", convertBlocksToTestCode, async (req, res, next) => {
  const { witAiResponses } = res.locals;
  res.json({ witAiResponses });
});

module.exports = router;
