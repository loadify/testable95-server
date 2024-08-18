const express = require("express");

const router = express.Router();

const renderBlocks = require("../controllers/render");

router.get("/", renderBlocks);

module.exports = router;
