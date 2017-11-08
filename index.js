var express = require('express')
var app = express()

const PORT = 8080;

app.use(express.static(__dirname + '/app/build'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/build/index.html');
})

app.listen(PORT, function () {
  console.log('Magic is happening on port' + PORT + '!')
})
