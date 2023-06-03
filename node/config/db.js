const sequelize = require("sequelize");

const con = new sequelize ("food_app", "root", "password", {
    dialect : "mysql",
    host : "localhost",
    max:30
});

module.exports = con;