var productsmodel = require("../models/ProductModel");
const Sequelize = require("sequelize");
const Category = require("./categories");
const { Op } = Sequelize;
const CategoryModel = require("../models/CategoryModel");

var express = require("express");
var app = express();

module.exports.getproducts = async (req, res) => {
  let condition = {};

  let limit = parseInt(req.query.limit) || 15;
  let offset = parseInt(req.query.offset)||0 ;

  if (req.query.id) {
    condition["id"] = req.query.id;
  }
  if (req.query.category_id) {
    condition["category_id"] = req.query.category_id;
  }
  if (req.query.status) {
    condition["status"] = req.query.status;
  }
  if (req.query.search) {
    let searchQuery = req.query.search;
    console.log(searchQuery);
    condition[Op.or] = [
      { name: { [Op.like]: `%${searchQuery}%` } },
      { description: { [Op.like]: `%${searchQuery}%` } },
    ];
  }

  await productsmodel.Products.findAndCountAll({
    attributes: ["id", "name", "description", "status", "price",'image', "category_id"],
    where: condition,
    offset: offset,
    limit: limit,
    order: [["id", "ASC"]],

    include: [
      {
        model: CategoryModel.Category,
        attributes: ["name"],
        required: true,
      },
    ],
  })
    .then((products) => {
      return res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while reading the user.",
      });
    });
};


module.exports.insertproducts = async (req, res) => {
  req.body.image=req.file.path
  
  const body = req.body;
  var name = body.name;
  var description = body.description;
  var status = body.status;
  var price = body.price;
  var category_id = body.category_id;
  await productsmodel.Products.create({
    name: name,
    description: description,
    status: status,
    price: price,
    image:req.file.path,
    category_id: category_id,
  }).then(res.status(200).json({ message: "data inserted" }));
},


module.exports.deleteProduct = async (req, res) => {
    await productsmodel.Products.findOne({
      attributes: ["id", "status"],
      where: { id: req.query.id },
    })
      .then((products) => {
        if (products) {
          productsmodel.Products.update(
            { status: "trash" },
            { where: { id: req.query.id } }
          ).then((productTrashed) => {
            return res.status(203).send({
              message: "Product added to Trash",
              productTrashed,
            });
          });
        } else {
          return res.status(206).send({
            message: "Product not found",
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          error: error,
        });
      });
  },

  module.exports.updateProduct = async (req, res) => {
    console.log(req.body,"hellooooooooo")
    if(req.file){
      req.body.image=req.file.path
    }

    await productsmodel.Products.findOne({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "status",
        "category_id",
      ],
      where: { id: req.query.id },
    })
      .then((products) => {
        if (products) {
          productsmodel.Products.update(req.body, {
            where: { id: req.query.id },
          }).then((updatedproduct) => {
            return res.status(202).send({
              message: "Product updated successfully",
              updatedproduct,
            });
          });
        } else {
          return res.status(208).send({
            message: "Product not found",
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          error: error,
        });
      });
  };
