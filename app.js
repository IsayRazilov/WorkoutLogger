var express        = require("express"),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    User           = require("./models/user"),
    Workout        = require("./models/workout"),
    methodOverride = require("method-override")

var app = express() ; 
var authRoutes = require("./routes/index");
var workoutRoutes = require("./routes/workouts");

mongoose.connect("mongodb://aciles1221:qwerty1221@ds143474.mlab.com:43474/workouts_logger");
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
// Runs for every route . 
app.use(function(req,res,next){
    res.locals.currentUser = req.user ; 
    next(); 
})
app.use(methodOverride("_method"));

// Passport config 
app.use(require("express-session")({
    secret: "Isay", 
    resave: false,
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(authRoutes);
app.use(workoutRoutes);

// var run = new Workout({
//     userid: "STAM",
//     type: "pullups",
//     image: "",
//     time: "7:00",
//     weight: "70",
//     repetions: "10"
// });


// run.save(function(err,workout){
//     if(err){
//         console.log("Error");
//     }else {
//         console.log("Added workout");
//         console.log(workout);
//     }
// })

// app.listen(3000,function(){
//     console.log("Server started at port 3000");
// });

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("login")
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});