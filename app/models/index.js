const mongoose = require("mongoose");

let db = {};
db.mongoose = mongoose;
db.product = require("./product.model");
module.exports = db;