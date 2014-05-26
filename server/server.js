// server.js

// set up ========================
console.log("#### initializing server");
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================
console.log("#### connecting to DB");
mongoose.connect('mongodb://admin:admin123@novus.modulusmongo.net:27017/heVu5gag'); 	// connect to mongoDB database on modulus.io
console.log("#### connected to DB");

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("#### App listening on port 8080");

// define model =================
var TaskDAO = mongoose.model('TaskDAO', {
    desc : String,
    dueDate : Date,
    status : String,
    priority : Number,
    user : String
});


console.log("#### DB model defined");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tasks
app.get('/api/task', function(req, res) {
//    res.header("Access-Control-Allow-Origin", "http://localhost");
    // use mongoose to get all tasks in the database
    TaskDAO.find(function(err, tasks) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(tasks); // return all task in JSON format
    });
});
