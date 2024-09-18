// backend entrypoint

// const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./config/db");
const cors = require("cors");

const app = require('./app')

// connect database
connectDB();

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));

// alternate connection method
// makes config/db.js obsolete
// mongoose
//     .connect(process.env.ATLAS_URI, {})
//     .then(() => {
//         app.listen(port, console.log(`Server running on port ${port}`));
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// module.exports = app;