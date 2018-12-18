var express      = require("express"),
    mongoose     = require("mongoose"),
    bodyParser   = require("body-parser");

var app = express() ; 

mongoose.connect("mongodb://localhost/workouts_logger");
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

var workoutSchema = new mongoose.Schema({
    name: String, 
    description: String
});

var Workout = mongoose.model("Workout", workoutSchema);

var run = new Workout({
    name: "Morning run",
    description : "First run for the week"
});

// run.save(function(err,workout){
//     if(err){
//         console.log("Error");
//     }else {
//         console.log("Added workout");
//         console.log(workout);
//     }
// })

app.get("/home",function(req,res){
    res.render("home");
});

app.listen(3000,function(){
    console.log("Server started at port 3000");
});