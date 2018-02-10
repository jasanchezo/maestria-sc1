// REFERENCIA: http://expressjs.com/es/starter/hello-world.html 

var express = require('express');
var express = require('path');

var app = expressLib();

app.use(express.static('./public'));



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});