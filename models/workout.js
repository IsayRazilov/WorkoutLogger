var mongoose = require("mongoose");

var WorkoutSchema = new mongoose.Schema({
    userid: String,
    type: String, 
    image: String,
    time: String,
    weight: String,
    repetions: String,
    date: String
});


module.exports = mongoose.model("Workout",WorkoutSchema);
