const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hotelModel } = require("../models/hotelModel");
require("dotenv").config();

const hotelController = Router();
hotelController.get("/", async (req, res) => {
  const hotels = await hotelModel.find();
  res.send(hotels);
});

module.exports = { hotelController };

hotelController.post("/hotelpost", async (req, res) => {
  const {
    hotel_name,
    description,
    image,
    price_inr,
    facilities,
    overview,
    userId,
  } = req.body;
  const details = new hotelModel({
    hotel_name,
    description,
    image,
    price_inr,
    facilities,
    overview,
    userId,
  });
  await details.save();
  res.status(200).json({ Message: "Details Added Successfully" });
});

hotelController.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await hotelModel.findOneAndDelete({
    _id: id
  });
  if (deleted) {
    res.status(200).json({ Message: "Deleted Successfully" });
  } else {
    res.json({ Message: "Not Authorized To Delete" });
  }
});