
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

const db = process.env.ATLAS_URI;

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    console.log(typeof db)
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;