const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./configs/db");
const { userController } = require("./routes/user.router");
const { authentication } = require("./middleware/authentication");
const { hotelController } = require("./routes/hotel.router");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ Message: "Welcome to Home Page" });
});
app.use(cors())

app.use("/user", userController);
app.use(authentication);
app.use("/hotel", hotelController);

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Listining on server ${port}`);
  } catch (error) {
    console.log("error while connectiong DB");
    console.log(error);
  }
});
