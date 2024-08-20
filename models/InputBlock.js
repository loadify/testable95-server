const mongoose = require("mongoose");

const { Schema } = mongoose;

const InputBlockSchema = new Schema({
  parameter: {
    type: String,
    required: true,
  },
});

const InputBlock = mongoose.model("InputBlock", InputBlockSchema);

module.exports = InputBlock;
