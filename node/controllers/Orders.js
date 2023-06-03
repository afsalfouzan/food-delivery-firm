const ordersModel  = require("../models/Orders")
const Sequelize = require("sequelize");
const ProductModel = require("../models/ProductModel")


module.exports.addOreders = async (req,res) =>{
    try{
        await ordersModel.create({
            reference_id: req.body.reference_id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            item_count: req.body.item_count,
            amount: req.body.amount
        })
        .then((order) => {
            if (order) {
                res.status(200).send({
                    id: order.id,
                    message: "ok"
                })
            }
            else {
                throw ({ code: 400, message: "error in adding orders" });
            }
        })
    }
    catch (error) {
        res.send(error);
    }

}

//get orders
module.exports.getOrders = async (req,res) =>{
   console.log(req.query,"useeeeeerrrrrr")
    let condition = {}
   if(req.query.user_id){
    condition['user_id'] = req.query.user_id
   }
    ordersModel.findAll({
        attributes:['id','reference_id','user_id','product_id','item_count','amount'],
        where:condition,
        include:[
            {
            model: ProductModel.Products,
            attributes:["name",'description','image'],
            required:true
            }
          ]
    })
    .then((order) =>{
        if(order){
        return res.status(200).send(order)
        }
        else{
            res.status(400).send({
                message:"No orders"
            })
        }
    })
    .catch((error) =>{
        return res.status(600).send(error)
    })
}