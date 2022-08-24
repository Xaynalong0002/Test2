let express = require('express');
let app = express();
let path = require('path');

//Setup the static assets directories
app.use(express.static('public/images'));
app.use(express.static('public/css'));


//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//database
let db = [];

app.set('port',8080);
app.listen(app.get('port'));

//homepage
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, 'views/homepage.html'));

});

//list all the parcel
app.get('/getparcels', function(req, res) {
    res.render('listparcels.html',{parcelDb: db});
});

//Filling the form page
app.get('/addparcel', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/newparcel.html'));
});

//POST send data to the server
app.post('/newparcel', function(req, res) { //more testing required
    

    if(req.body.sender.length < 3 || req.body.address.length < 3 || req.body.weight < 0){ //add the true or false
        res.sendFile(path.join(__dirname, 'views/invaliddata.html'));
    }
    else {
        db.push(req.body); 
        res.redirect('/');
    }

});


//extra task
app.get('/heavyparcels', function(req, res) {
    res.render('heavyparcel.html',{parcelDb: db});

});


//handling error
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/404.html'));
});


