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

//POST
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

//DELETE
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

//EDIT
hotelController.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // This should contain the fields you want to update
  
  try {
    const updatedHotel = await hotelModel.findOneAndUpdate(
      { _id: id }, // filter by the hotel's id
      updateData, // the fields to update
      { new: true } // option to return the updated document
    );

    if (updatedHotel) {
      res.status(200).json({ Message: "Updated Successfully", updatedHotel });
    } else {
      res.status(404).json({ Message: "Hotel Not Found" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Error Updating Hotel", error: error.message });
  }
});
