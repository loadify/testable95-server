const express = require("express");

const convertBlocksToTestCode = require("../middlewares/blockConverter");

const router = express.Router();

router.post("/", convertBlocksToTestCode, async (req, res, next) => {
  const { testCode } = res.locals;
  res.json({ testCode });
});

module.exports = router;
