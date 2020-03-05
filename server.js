const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// create express app
const app = express();
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'home', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    'secret': '343ji43j4n3jn4jk3n',
    'resave' : false
  }));
// parse requests of content-type - application/json
app.use(bodyParser.json())
require('./app/routes/myroutes.routes.js')(app);
// define a simple route
app.get('/', (req, res) => {
    if(!req.session.reg_no)
  res.redirect('/register');
// res.redirect('/test');
else 
  {
     //res.json(req.session);
    //console.log(req.session.name);
   res.redirect('/article');
  }    
});

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});