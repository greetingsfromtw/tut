var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/route',function(req,res){
	res.send('this is a route');
})

app.listen(3000);
console.log('port listening at port 3000');
