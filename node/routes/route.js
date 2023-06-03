const express = require("express");
const router = express.Router();
const users = require('../controllers/users')
const categories = require ('../controllers/categories')
const products = require ('../controllers/products');
// const mongo_Cat = require("../controllers/mongoauth/mongo_categories/mongo_Cat")
const roles = require('../controllers/roles')
const cart = require("../controllers/cart")
const Orders = require('../controllers/Orders')
const multer  = require('multer')
const path=require('path');
const { jwtTokenVerify } = require("../jwttoken/jwt");


const storage = multer.diskStorage({
    destination:'public/uploads',
    filename:(req,file,cb)=>{
        console.log(file,"file")
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload= multer({storage:storage})


//orders
router.post('/order/add',jwtTokenVerify,Orders.addOreders)
router.get('/order/view',Orders.getOrders)

//cart
router.get('/cart/view',jwtTokenVerify,cart.getcartdata)
router.post('/cart/add',jwtTokenVerify,cart.addCart)
router.delete('/cart/delete',jwtTokenVerify,cart.deleteCart)
router.put('/cart/update',jwtTokenVerify,cart.updateCart)
//users
router.post('/user/loginuser',users.loginuser);
router.post('/user/insertuserdata', users.insertusers);
router.get('/users/list', users.Getusers)
router.put('/user/trash', users.trashUser);
router.put('/user/update',users.updateUser)




//admin
router.get('/admin/getcategory', categories.getcategory)
router.get('/admin/getproduct',jwtTokenVerify, products.getproducts)
router.post('/admin/products/create',upload.single('image'),products.insertproducts)
router.put('/admin/products/deleteProduct',jwtTokenVerify,products.deleteProduct)
router.put('/admin/products/updateProduct',upload.single('image'),products.updateProduct)

//role
router.get('/roles',roles.getroles)




// router.get('/admin/mongo_Getcategory',mongo_Cat.mongo_Getcategory)
// router.post('/admin/mongo_insertCategory', mongo_Cat.mongo_insertCategory)
// router.put('/admin/updateCategory', mongo_Cat.updateCategory)
// router.delete('/admin/deleteCategory', mongo_Cat.deleteCategory)







module.exports = router;