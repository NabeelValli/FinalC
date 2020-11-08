const express = require('express');
const weather = require('openweather-apis');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'build')));

app.get('/',function(req,res){
    res.sendFile(path.join(_dirname, 'build','index.html'));

});

app.listen(8080);
/*
const api = {
    key: "a8dbabeb48ef2565ae8f17d6ac7d4d4a",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  */


//let api = fetch()