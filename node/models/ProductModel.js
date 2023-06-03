const sequelize = require("sequelize");
var conn = require("../config/db");
var Category = require("./CategoryModel");

let Products = conn.define(
  "products",
  {
    id: {
      type: sequelize.INTEGER(30),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: sequelize.STRING(200),
      allowNull: false,
    },
    description: {
      type: sequelize.STRING(200),
      allowNull: false,
    },
    status: {
      type: sequelize.ENUM("active", "inactive", "trash"),
      defaultValue: "active",
      allowNull: false,
    },
    price: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: sequelize.STRING(400),
      allowNull:true
    },
    category_id: {
      type: sequelize.INTEGER(30),
      foreignKey: true,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

// Products.sync({force:true});

Products.sync();
// console.log(Category)

Category.Category.hasMany(Products, { foreignKey: "category_id" });
Products.belongsTo(Category.Category, { foreignKey: "category_id" });

module.exports.Products = Products;
