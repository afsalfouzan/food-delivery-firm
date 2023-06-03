const Sequelize = require("sequelize");
const con = require("../config/db");
let roles = con.define(
  "roles",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    role_name: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// roles.sync({force: true})
roles.sync();
module.exports = roles;
