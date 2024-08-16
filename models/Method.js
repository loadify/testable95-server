const mongoose = require("mongoose");

const { Schema } = mongoose;

const MethodSchema = new Schema({
  snippet: { type: String, required: true },
  keyword: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Method = mongoose.model("Method", MethodSchema);

module.exports = Method;
