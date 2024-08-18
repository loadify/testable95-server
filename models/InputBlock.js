const mongoose = require("mongoose");

const inputBlockSchema = new mongoose.Schema({
  parameter: {
    type: String,
    required: true,
  },
});

const InputBlock = mongoose.model("InputBlock", inputBlockSchema);

module.exports = InputBlock;
