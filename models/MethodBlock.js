const mongoose = require("mongoose");

const { Schema } = mongoose;

const MethodBlockSchema = new Schema({
  method: {
    type: String,
    required: true,
  },
});

const MethodBlock = mongoose.model("MethodBlock", MethodBlockSchema);

module.exports = MethodBlock;
