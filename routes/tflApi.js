const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/bikepoint", async (req, res) => {
  try {
    const response = await axios.get("https://api.tfl.gov.uk/bikepoint");

    // Handle successful response
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Error fetching bikepoint data");
  }
});

module.exports = router;
