const express = require("express");

const convertBlocksToTestCode = require("../middlewares/blockConverter");

const router = express.Router();

router.post("/", convertBlocksToTestCode, async (req, res, next) => {
  const { keywords } = res.locals;
  res.json({ keywords });
});

module.exports = router;
