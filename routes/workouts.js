var express  = require("express"), 
    router   = express.Router(),
    User     = require("../models/user"),
    Workout  = require("../models/workout");


router.get("/workouts",isLoggedIn,function(req,res){
    User.findById(req.user._id).populate("workouts").exec(function(err,foundUser){
        if(err) {
            console.log(err) ;
        } else {
            res.render("workouts",{ currentUser: req.user,workouts: foundUser.workouts });
        }
    });
});

router.get("/workouts/new",isLoggedIn,function(req,res){
    res.render("new",{currentUser: req.user});
});

router.post("/workouts",isLoggedIn,function(req,res){
    var date = new Date(); 
    req.body.workout.date = date.toDateString() ;
    Workout.create(req.body.workout,function(err,newWorkout){
        if(err){
            console.log(err)
        } else {
            User.findById(req.user._id,function(err,foundUser){
                if(err){
                    console.log(err)
                } else {
                    foundUser.workouts.push(newWorkout);
                    foundUser.save(function(err,data){
                        if(err) {
                            console.log(err);
                        }
                    });
                }
            });
            res.redirect("/workouts")
        }
    })
});

router.get("/workouts/:id",isLoggedIn,function(req,res){
    Workout.findById(req.params.id, function(err,foundWorkout){
        if(err){
            res.redirect("/workouts")
        } else {
            res.render("show", {currentUser: req.user,workout: foundWorkout})
        }
    })
});

router.get("/workouts/:id/edit",isLoggedIn,function(req,res){
    Workout.findById(req.params.id,function(err,foundWorkout){
        if(err){
            res.redirect("/workouts")
        } else {
            res.render("edit",{currentUser: req.user,workout: foundWorkout })
        }
    })
});

router.put("/workouts/:id",isLoggedIn,function(req,res){

    Workout.findByIdAndUpdate(req.params.id,req.body.workout,function(err,updatedWorkout){
        if(err){
            res.redirect("/workouts")
        } else {
            res.redirect("/workouts/" + req.params.id)
        }
    })
})

router.delete("/workouts/:id",isLoggedIn, function(req,res){
    Workout.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/workouts")
        } else {
            User.findById(req.user._id,function(err,foundUser){
                if(err) {
                    console.log(err) ;
                } else {
                    var toDelete = -1 ;
                    foundUser.workouts.forEach(function(workout,index){
                        if(workout._id.equals(req.params.id)){
                            toDelete = index 
                        }
                    }); 
                    foundUser.workouts.splice(toDelete,1);
                    foundUser.save(function(err,data){});
                }
            });
            res.redirect("/workouts")
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("login")
}

module.exports = router ;
