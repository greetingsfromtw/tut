var express = require('express');
var app = express();

app.set('views',__dirname + '/views');
app.set('view engine','jade');


app.use(express.static(__dirname + '/public'));

app.get('/route',function(req,res){
	res.send('this is a route');
})

app.get('/hello',function(req,res){
	res.render('hello');
})

app.listen(3000);
console.log('port listening at port 3000');

