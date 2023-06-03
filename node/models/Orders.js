const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const products = require("./ProductModel");
const user = require("./UserModel");
const order = sequelize.define(
  "Order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    reference_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER(100),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    product_id: {
      type: Sequelize.INTEGER(20),
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    item_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: true }
);
products.Products.hasMany(order, { foreignKey: "product_id" });
order.belongsTo(products.Products, { foreignKey: "product_id" });
user.users.hasMany(order, { foreignKey: "user_id" });
order.hasMany(user.users, { foreignKey: "user_id" });
// order.sync({force:true});
order.sync();

module.exports = order;
