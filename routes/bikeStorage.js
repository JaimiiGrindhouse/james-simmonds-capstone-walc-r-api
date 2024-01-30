const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const bikeStorageDataPath = path.join(__dirname, "../data/cycle_parking.json");

function readBikeStorageData() {
  try {
    const data = fs.readFileSync(bikeStorageDataPath, "utf-8");
    console.log("Raw data from file:", data);

    const parsedData = JSON.parse(data);
    console.log("Parsed data:", parsedData);

    if (Array.isArray(parsedData.bike_storage)) {
      return parsedData.bike_storage;
    } else {
      throw new Error("Data is not in the expected format");
    }
  } catch (error) {
    throw error;
  }
}

function handleServerError(res, error, message = "Server Error") {
  console.error(error);
  res.status(500).json({ error: message });
}

// Common function for handling 404 errors
function handleNotFound(res, message = "Not Found") {
  res.status(404).json({ error: message });
}

// Common function for handling 200 success
function handleSuccess(res, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(data);
  console.log(data);
}

// Test route to establish the server is running correctly //
router.get("/test", function (req, res) {
  handleSuccess(res, "<h1>Test route working</h1>");
});
