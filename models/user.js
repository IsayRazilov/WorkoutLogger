var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String, 
    mail: String,
    password: String,
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);
