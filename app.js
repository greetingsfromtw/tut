var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World^^');
});

app.all('/secret',function(req,res){
	res.send('entering secret section..')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});