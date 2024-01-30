const express = require("express");

const app = express();
const port = 5059;

const giftsRouter = require("./routes/bikeStorage");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bikestorage");

app.listen(`${port}`, function () {
  console.log(`Server running on port ${port}`);
});
