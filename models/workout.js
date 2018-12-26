var mongoose = require("mongoose");

var WorkoutSchema = new mongoose.Schema({
    name: String, 
    description: String
});


module.exports = mongoose.model("Workout",WorkoutSchema);
