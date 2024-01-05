// this file is refered to as app.js in tutorial
// backend entrypoint

const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/api/books");
const workoutRoutes = require("./routes/api/workouts");
const underloadRoutes = require("./routes/api/underloadworkouts");
const durationRoutes = require("./routes/api/durationworkouts");
const distanceRoutes = requrie("./routes/api/distanceworkouts");
const cors = require("cors");
const bodyParser = require("body-parser");
const DistanceWorkout = require("./models/DistanceWorkout");


const app = express();

// middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for workouts and books apis
app.use("/api/books", bookRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/underloadworkouts", underloadRoutes);
app.use("/api/durationworkouts", durationRoutes);
app.use("/api/distanceworkouts", distanceRoutes);

// connect database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));