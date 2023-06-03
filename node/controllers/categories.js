var categorymodel = require("../models/CategoryModel");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

var express = require("express");
var app = express();

module.exports.getcategory = async (req, res) => {
    categorymodel.Category.findAll({
    attributes: ["id", "name"],
  })
    .then((categories) => {
      return res.status(200).json({ categories });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};
