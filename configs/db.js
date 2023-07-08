const mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.connect(process.env.MONGODB_URL);
module.exports = { connection };
