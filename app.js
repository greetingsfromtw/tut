var express = require('express');
var app = express();
var bodyParser=require('body-parser');

app.set('views',__dirname + '/views');
app.set('view engine','jade');

//設定靜態網頁路徑
app.use(express.static(__dirname + '/public'));

//設定bodyParser支援application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended:false
}));

app.get('/main',function(req,res){
	res.render('main',{title:'main page'});
})

app.get('/table',function(req,res){
	res.render('table',{title:'table testing'});
})

app.get('/loop',function(req,res){
	res.render('loop',{title:'loop testing'});
})

app.get('/list',function(req,res){
	res.render('list',{title:'list testing'});
})

app.get('/form',function(req,res){
	res.render('form',{title:'form testing'});
})
app.post('/output',function(req,res){
	console.log(req.body.username);
	console.log(req.body.pwd);
	res.render('output',{
		title:'form testing(output)',
		username:req.body.username,
		pwd:req.body.pwd,
		});
})

app.get('/mydir',function(req,res){
	res.send(req.query.name);
	console.log(req.query.pwd);
})

app.listen(3000);
console.log('port listening at port 3000');

