const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL);
};

module.exports = connectDB;
