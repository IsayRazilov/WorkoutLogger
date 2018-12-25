var express      = require("express"),
    mongoose     = require("mongoose"),
    bodyParser   = require("body-parser");
    passport     = require("passport");
    localStrategy = require("passport-local");
    User          =    require("./models/user");

var app = express() ; 

mongoose.connect("mongodb://aciles1221:qwerty1221@ds143474.mlab.com:43474/workouts_logger");
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

// Passport config 
app.use(require("express-session")({
    secret: "Isay is the shit", 
    resave: false,
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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


// AUTH Routes 

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/home")
        })
    });
});

app.listen(3000,function(){
    console.log("Server started at port 3000");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });