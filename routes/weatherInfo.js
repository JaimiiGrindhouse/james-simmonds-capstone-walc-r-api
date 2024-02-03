const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:coordinates", async (req, res) => {
  try {
    // Destructure coordinates to obtain latitude and longitude
    const [lat, lon] = req.params.coordinates.split(",");

    // You may want to validate and parse the coordinates here before making the request

    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    console.log("API Key:", apiKey);

    // Use latitude and longitude in the OpenWeatherMap API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&icon=true`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    console.log(weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
