const Sequelize = require('sequelize')
const conn = require("../config/db")
const ProductModel = require ("./ProductModel")
const UserModel = require ("./UserModel")


 const cartModel = conn.define(
    'cart', {
        id: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER(10),
            references: {
                model: 'products',
                key: 'id'
            }
        },
        product_name: {
            type: Sequelize.STRING(20),
          
        },
        count: {
            type: Sequelize.INTEGER(10),
           
        },
        user_id: {
            type: Sequelize.INTEGER(10),
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            type: Sequelize.DATE()
    
        },
        updatedAt: {
            type: Sequelize.DATE()
    
        },
    },
        {
            freezeTableName: true, timestamps: true,
          
            
        },
      
    );
    // cartModel.sync({force:true});
    // cartModel.sync()
    
ProductModel.Products.hasMany(cartModel,{foreignKey:'product_id'});
cartModel.belongsTo(ProductModel.Products,{foreignKey:'product_id'})
UserModel.users.hasOne(cartModel, { foreignKey: 'user_id' });
cartModel.belongsTo(UserModel.users, { foreignKey: 'user_id' })

module.exports.cartModel = cartModel