const express = require("express");

const router = express.Router();

const renderBlocks = require("../controllers/render");
const handleBlocks = require("../controllers/blocks");

router.get("/", renderBlocks);
router.post("/", handleBlocks);

module.exports = router;
