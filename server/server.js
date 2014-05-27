// server.js

// set up ========================
console.log("#### initializing server");
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb



console.log("#### server context root: " + __dirname);


app.configure(function() {
    app.use(express.static(__dirname + '/../client')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

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
app.get('/api/tasks', function(req, res) {
//    res.header("Access-Control-Allow-Origin", "http://localhost");
    // use mongoose to get all tasks in the database
    TaskDAO.find(function(err, tasks) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(tasks); // return all task in JSON format
    });
});

app.post('api/tasks', function(req, res){
    Task.create({
        desc : req.body.desc,
        dueDate : req.body.dueDate,
        status: req.body.status
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Task.find(function(err, task) {
            if (err)
                res.send(err)
            res.json(task);
        });
    });
});



// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile( '../client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    console.log("#### Reviceved genric url, sent the page to index.html");
});