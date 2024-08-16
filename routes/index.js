const express = require("express");

const router = express.Router();

const { findAllMethods } = require("../controllers/search");

router.get("/", findAllMethods);

module.exports = router;
