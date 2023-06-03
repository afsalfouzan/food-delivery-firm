var roleModel = require("../models/RolesModel");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

var express = require("express");
var app = express();

module.exports.getroles = async (req, res) => {
    roleModel.findAll({
    attributes: ["id", "role_name"],
  })
    .then((roles) => {
      return res.status(200).json({ roles });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};
