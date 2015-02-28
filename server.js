var express = require('express'),
    json = require('express-json'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require("http"),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


http.createServer(app).listen(port, function () {

    console.log('Master I am here to serve you on port ', port);
});