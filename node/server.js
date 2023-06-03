var express = require("express")
// var mongo_db = require("./config/mongodb")
var route = require("./routes/route");
var app = express();

const bodyParser = require("body-parser");
const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public/uploads', express.static('public/uploads'))



app.use("/api",route);
app.listen(9000);
console.log("listening to port")


module.exports = app