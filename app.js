var express = require('express');
var app = express();

app.set('views',__dirname + '/views');
app.set('view engine','jade');


app.use(express.static(__dirname + '/public'));

app.get('/main',function(req,res){
	res.render('main',{title:'main page'});
})

app.get('/loop',function(req,res){
	res.render('loop',{title:'loop testing'});
})

app.get('/table',function(req,res){
	res.render('table',{title:'table testing'});
})

app.listen(3000);
console.log('port listening at port 3000');

