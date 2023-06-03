var express = require("express");
var app = express();
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;
const crypto = require("crypto");
const { jwtTokenGeneration } = require("../jwttoken/jwt");
const model2 = require("../models/UserModel");
const rolesModel = require("../models/RolesModel");
const { off } = require("process");

module.exports.Getusers = async (req, res) => {
  console.log(req.query, "id varumoo");
  let limit = parseInt(req.query.limit) || 5;
  let offset = parseInt(req.query.offset) || 0;
  let condition = {};
  if (req.query.status) {
    condition["status"] = req.query.status;
  }
  if (req.query.role_id) {
    condition["role_id"] = req.query.role_id;
  }
  if (req.query.id) {
    condition["id"] = req.query.id;
  }

  if (req.query.search) {
    let searchQuery = req.query.search;
    console.log(searchQuery);
    condition[Op.or] = [
      { first_name: { [Op.like]: `%${searchQuery}%` } },
      { last_name: { [Op.like]: `%${searchQuery}%` } },
      { email: { [Op.like]: `%${searchQuery}%` } },
      { phone_number: { [Op.like]: `%${searchQuery}%` } },
    ];
  }
  await model2.users
    .findAndCountAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "role_id",
        "status",
      ],
      where: condition,
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
      include: [
        {
          model: rolesModel,
          attributes: ["role_name"],
          required: true,
        },
      ],
    })
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(400).send({
        message: "users cannot find",
      });
    });
};

module.exports.insertusers = async (req, res) => {
  console.log(req.body, "user varunnundooo");
  var body = req.body;
  var first_name = body.first_name;
  var last_name = body.last_name;
  var email = body.email;
  var phone_number = body.phone_number;
  var role_id = body.role_id;
  var password = body.password;

  const password_salt = Math.random().toString(36).slice(-8);
  const hash = crypto
    .createHmac("sha256", password_salt)
    .update(password)
    .digest("hex");
  console.log(hash);
  await model2.users
    .create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      role_id: role_id,
      password: hash,
      password_salt: password_salt,
    })
    .then((users) => {
      res.status(200).json({
         message: "inserted data",users
         })
        });
};

module.exports.loginuser = async (req, res) => {
  try {
    const logemail = req.body.email;
    const password = req.body.password;
    console.log(req.body, "hi");

    const user = await model2.users.findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "role_id",
        "status",
        "password",
        "password_salt",
      ],
      where: { email: req.body.email },
    });
    console.log(user, "hiiiiiiiiiiiiiiii++++++++++++++++");
    if (user) {
      const encypteddata = crypto
        .createHmac("sha256", user.password_salt)
        .update(password)
        .digest("hex");
      console.log(encypteddata);
      console.log(user.password);
      if (encypteddata == user.password) {
        // const user = {};
        let token = jwtTokenGeneration(user.email);
        res.status(200).json({
          users: {
            message: "success",
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
            role_id: user.role_id,
            tokenData: token,
          },
        });
      } else {
        let users = { message: "password is incorrect" };
        res.send({ users });
      }
    } else {
      console.log("hello guys");
      let users = { message: "invalid user id" };
      res.send({ users });
    }
  } catch (error) {
    console.error("invalid", error);
  }
};

module.exports.trashUser = async (req, res) => {
  await model2.users
    .findOne({
      attributes: ["id", "status"],
      where: { id: req.query.id },
    })
    .then((users) => {
      if (users) {
        model2.users
          .update({ status: "trash" }, { where: { id: req.query.id } })
          .then((userTrashed) => {
            return res.status(206).send({
              message: "Product added to Trash",
              userTrashed,
            });
          });
      } else {
        return res.status(208).send({
          message: "user not found",
        });
      }
    })
    .catch((error) => {
      return res.status(450).json({
        error: error,
      });
    });
};

module.exports.updateUser = async (req, res) => {
  console.log(req.body, "varomooooooo");
  await model2.users
    .findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "role_id",
        "status",
      ],
      where: { id: req.query.id },
    })
    .then((user) => {
      if (user) {
        model2.users
          .update(req.body, { where: { id: req.query.id } })
          .then((updateuser) => {
            return res.status(202).send({
              message: "User updated successfully",
              updateuser,
            });
          });
      } else {
        return res.status(208).send({
          message: "User not found",
        });
      }
    });
};
