const createError = require("http-errors");

const MethodBlock = require("../models/MethodBlock");
const InputBlock = require("../models/InputBlock");

const renderBlocks = async (req, res, next) => {
  try {
    const [methodBlocks, inputBlocks] = await Promise.all([
      MethodBlock.find().lean(),
      InputBlock.find().lean(),
    ]);

    res.json({ methodBlocks, inputBlocks });
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

module.exports = renderBlocks;
