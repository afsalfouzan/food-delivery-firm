const { cartModel } = require("../models/CartModel");
const Sequelize = require("sequelize");
const ProductModel = require("../models/ProductModel");

//get data
module.exports.getcartdata = async (req, res) => {
  let condition = {};
  if (req.query.user_id) {
    condition["user_id"] = req.query.user_id;
  }
  cartModel
    .findAndCountAll({
      attributes: ["id", "product_id", "product_name", "count", "user_id"],
      where: condition,
      include: [
        {
          model: ProductModel.Products,
          attributes: ["price"],
          required: true,
        },
      ],
    })
    .then((cart) => {
      return res.status(200).json({ cart });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

//post data
module.exports.addCart = async (req, res) => {
  let find = await cartModel.findOne({
    where: { product_id: req.body.product_id, user_id: req.body.user_id },
  });
  if (find) {
    let c = req.body.count + find.count;
    if (c != 0) {
      await cartModel
        .update(
          { count: c },
          {
            where: {
              product_id: req.body.product_id,
              user_id: req.body.user_id,
            },
          }
        )
        .then((cart) => {
          res.status(200).send({ message: "item added sccessfully", cart });
        });
    } else {
      cartModel.destroy({
        where: { product_id: req.body.product_id, user_id: req.body.user_id },
      });
    }
  } else {
    await cartModel
      .create({
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        count: req.body.count,
        user_id: req.body.user_id,
      })
      .then((cart) => {
        res.status(200).send({ message: "item added", cart });
      })
      .catch((error) => {
        return res.status(400).json({
          error: error,
        });
      });
  }
};

//delelte data

module.exports.deleteCart = async (req, res) => {
  console.log(req.query, "deleeete ");
  let condition = {};
  if (req.query.id) {
    condition["id"] = req.query.id;
  }
  await cartModel
    .findOne({
      where: condition,
    })
    .then((cartitem) => {
      if (cartitem) {
        cartModel.destroy({ where: condition }).then((deleteitem) => {
          return res.status(205).send({
            message: "Product deletes successfully",
            deleteitem,
          });
        });
      } else {
        return res.status(206).send({
          message: "Product not found",
        });
      }
    })
    .catch((error) => {
      return res.status(400).send({
        message: "error",
        error,
      });
    });
};

//update cart
module.exports.updateCart = async (req, res) => {
  try {
    console.log(req.query, req.body, "varoooooooo");
    let cart = await cartModel.findOne({
      where: { id: req.query.id, user_id: req.query.user_id },
    });
    let ct = cart.count + req.body.count;
    if (ct > 0) {
      console.log(ct, "daaaaaashedd");
      await cartModel
        .update(
          { count: ct },
          { where: { id: req.query.id, user_id: req.query.user_id } }
        )
        .then((item) => {
          if (item) {
            res.status(200).send({
              message: "cart updated",
            });
          } else {
            throw { message: "error in updation" };
          }
        });
    } else {
      cartModel.destroy({
        where: { id: req.query.id, user_id: req.query.user_id },
      });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
