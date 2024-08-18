const createError = require("http-errors");

const MethodBlock = require("../models/MethodBlock");
const InputBlock = require("../models/InputBlock");

const renderBlocks = async (req, res, next) => {
  try {
    const methodBlocks = await MethodBlock.find();
    const inputBlocks = await InputBlock.find();

    res.json({ methodBlocks, inputBlocks });
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

module.exports = renderBlocks;
