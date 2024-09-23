// backend entrypoint

require("dotenv").config({ path: "./config.env" });
const connectDB = require("./config/db");

const app = require('./app')

// connect database
connectDB();

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));

// module.exports = app;