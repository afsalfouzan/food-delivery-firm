const cart = require("./cart/index")
const product = require("./products/index")
const user = require("./users/index")
const order = require("./orders/index")
exports.definitions = {
    ...cart,
    ...product,
    ...user,
    ...order
}
