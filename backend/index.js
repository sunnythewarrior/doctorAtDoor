const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect to the database
const connectWithDb = require("./config/db");
const db = connectWithDb(); // Assuming connectWithDb returns the Mongoose connection

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000; // Use uppercase PORT
app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
