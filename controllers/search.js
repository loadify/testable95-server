const createError = require("http-errors");

const Method = require("../models/Method");

exports.findAllMethods = async (req, res, next) => {
  try {
    const methods = await Method.find();
    res.render("index", {
      data: methods,
    });
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};
