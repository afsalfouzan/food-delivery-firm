const sequelize = require("sequelize");
var conn = require("../config/db");

let Category = conn.define(
  "categories",
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
// Category.sync({force:true});
Category.sync();
module.exports.Category = Category;
