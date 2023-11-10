const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  hotel_name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price_inr: { type: String, required: true },
  facilities: { type: [String], required: true },
  overview: { type: String, required: true },
  userId: { type: String, required: true },
});

const hotelModel = mongoose.model("hotel", hotelSchema);
module.exports = { hotelModel };
