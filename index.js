const express = require("express");
const app = express();
const port = 5059;
const cors = require("cors"); //enables cors
const dotenv = require("dotenv");

const bikeStorageRouter = require("./routes/bikeStorage");
const weatherInfoRouter = require("./routes/weatherInfo");
const tflSantanderInfo = require("./routes/tflApi");

require("dotenv").config();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bikestorage", bikeStorageRouter);
app.use("/weather", weatherInfoRouter);
app.use("/santander", tflSantanderInfo);

app.listen(`${port}`, function () {
  console.log(`Server running on port ${port}`);
});
