const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_STRING)
mongoose.connection.once("open", () => console.log("Connected to MongoDB Atlas."))

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

// if(require.main === module){
// 	app.listen(process.env.PORT || 4000, () => {
// 	    console.log(`API is now online on port ${ process.env.PORT || 4000 }.`)
// 	});
// }

module.exports = {app,mongoose};