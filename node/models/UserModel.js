const Sequelize = require("sequelize");
const con = require("../config/db");
const roles = require("./RolesModel");

let users = con.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER(30),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },

    last_name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: Sequelize.INTEGER(30),
      allowNull: false,
      defaultValue: 1,
      references: {
        model: roles,
        key: "id",
      },
    },
    status: {
      type: Sequelize.ENUM('active','inactive','trash'),
      allowNull:false,
      defaultValue: 'active',
    },
    password: {
      type: Sequelize.STRING(405),
      allowNull: false,
    },
    password_salt: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    role_id: {
      type: Sequelize.INTEGER(30),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

roles.hasMany(users, { foreignKey: "role_id" });
users.belongsTo(roles, { foreignKey: "role_id" });
// users.sync({force:true});
users.sync();


module.exports.users = users;
