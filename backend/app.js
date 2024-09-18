// backend entrypoint

const express = require("express");
const cookieParser = require("cookie-parser")

// register routes here
// const bookRoutes = require("./routes/api/books");
const userRoutes = require("./routes/api/users");
const workoutRoutes = require("./routes/api/workouts");
const underloadRoutes = require("./routes/api/underloadworkouts");
const durationRoutes = require("./routes/api/durationworkouts");
const distanceRoutes = require("./routes/api/distanceworkouts");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use cookieparser middleware to handles cookies from frontend
app.use(cookieParser());

// use the routes module as a middleware
// for workouts and users apis
// app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/underloadworkouts", underloadRoutes);
app.use("/api/durationworkouts", durationRoutes);
app.use("/api/distanceworkouts", distanceRoutes);

// app.get('/', (req, res) => res.send('Hello world!'));

module.exports = app;