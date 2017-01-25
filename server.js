const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');



app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err) =>  {
    if(err){
      console.log('could not write to server.log file');
    }
  });
  console.log(log);
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentyear",() => new Date().getFullYear());

hbs.registerHelper("screamIt", (text) => text.toUpperCase() );

app.get('/',(req,res) => {
  //res.send('<h1>Hello Express');
/*  res.send({
    "name":"rakesh",
    "hobbies": [
      'reading',
      'watching'
    ]
  });*/
  res.render('home.hbs',{
    pageTitle: "Home",
    visitor: "Rakesh"
  });
});

app.get('/about',(req, res) => {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: "About Page"
  });
});

app.get('/bad',(req,res) => {
  res.send({
    "errorMessage" : "Error in processing request"
  });
});

app.listen(3000,() => {
  console.log('Server is up on port 3000');
});
