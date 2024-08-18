const mongoose = require("mongoose");

const methodBlockSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
});

const MethodBlock = mongoose.model("MethodBlock", methodBlockSchema);

module.exports = MethodBlock;
