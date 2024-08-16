const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
