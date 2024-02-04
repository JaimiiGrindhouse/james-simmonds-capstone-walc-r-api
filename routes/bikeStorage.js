const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { parse, featureCollection } = require("@turf/turf"); //turf library to handle parsing geo-json

const bikeStorageDataPath = path.join(__dirname, "../data/cycle_parking.json");

function readBikeStorageData() {
  try {
    const data = fs.readFileSync(bikeStorageDataPath, "utf-8");
    const parsedData = JSON.parse(data);

    if (featureCollection(parsedData)) {
      return parsedData.features; // Access features from the parsed GeoJSON object
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

// Common handle success for the GET by borough, createing the json object to parse
function handleSuccess(res, filteredData) {
  const response = {
    borough: filteredData[0].properties.BOROUGH,
    features: filteredData.map((feature) => {
      const [lon, lat] = feature.geometry.coordinates; // Destructure array
      return {
        lon,
        lat,
        FEATURE_ID: feature.properties.FEATURE_ID,
        PRK_PROVIS: feature.properties.PRK_PROVIS,
        PRK_CPT: feature.properties.PRK_CPT,
        PHOTO1_URL: feature.properties.PHOTO1_URL,
        PHOTO2_URL: feature.properties.PHOTO2_URL,
      };
    }),
  };
  res.json(response);
}

// Test route to establish the server is running correctly //
router.get("/test", function (req, res) {
  handleSuccess(res, "<h1>Test route working</h1>");
});

router.get("/borough/:boroughName", function (req, res) {
  try {
    const allStorageData = readBikeStorageData();
    const boroughName = req.params.boroughName.toLowerCase();

    const filteredData = allStorageData.filter((feature) => {
      return feature.properties.BOROUGH.toLowerCase() === boroughName;
    });

    if (filteredData.length === 0) {
      handleNotFound(res, `No storage found in ${boroughName}`);
    } else {
      handleSuccess(res, filteredData); // Send the GeoJSON features directly
    }
  } catch (error) {
    handleServerError(res, error);
  }
});

module.exports = router;
