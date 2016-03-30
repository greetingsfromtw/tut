//若用router方式使用mongoose,
//則寫:
//require('../lib/db');
//注意有多一個"."
require('./lib/db');
var mongoose = require('mongoose');
var todoDB = mongoose.model('todoDB');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var cookieSession = require('cookie-session');


var app = express();

//設定jade為預設render引擎
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');

//設定靜態網頁路徑
app.use(express.static(__dirname + '/public'));

//設定bodyParser支援application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended:false
}));


//啟用cookie解析器
app.use(cookieParser());

//啟用cookie session
app.use(cookieSession({
	key:'node',
	secret:'hicookieSession'
}));

app.get('/todo',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	todoDB.find(function ( err, todos, count ){
	res.render( 'todo',{
			title:'todo list testing',
			todos:todos
		})
	})
})
	


app.post('/add',function(req,res){
	todoDB.create({
		content:req.body.add
	})
	res.locals.logined= req.session.logined;
	todoDB.find(function ( err, todos, count ){
	res.render( 'todo',{
			title:'todo list testing',
			todos:todos
		})
	})	
})

app.get('/delete/:id', function(req, res, next) {
    todoDB.remove({ _id: req.params.id }, function(err) {
        if (err)
            console.log('Fail to delete article.');
        else
            console.log('Done');
    });
    res.locals.logined= req.session.logined;
	todoDB.find(function ( err, todos, count ){
	res.render( 'todo',{
			title:'todo list testing',
			todos:todos
		})
	})	
})

app.get('/edit/:id', function(req, res, next) {
	res.locals.logined= req.session.logined;
	todoDB.find({ _id: req.params.id }, function ( err, todos, count ){
		res.render( 'edit', {
 			title:'todo list testing',
			todos:todos,
			getid:req.params.id
		});
	});		
});

app.post('/update/:id', function(req, res, next) {
    todoDB.update({ _id: req.params.id }, { content: req.body.getcontent }, function(err) {
        if (err)
            console.log('Fail to update content.');
        else
            console.log('Done');
    })
    res.locals.logined= req.session.logined;
    todoDB.find(function ( err, todos, count ){
	res.render( 'todo',{
			title:'todo list testing',
			todos:todos
		})
	})	 
});





app.get('/main',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}

	res.locals.logined= req.session.logined;
	res.render('main',{title:'main page'});
})

app.get('/jQueryTest',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	res.render('jQueryTest',{title:'jQuery Testing'});
})

app.get('/table',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	res.render('table',{title:'table testing'});
})

app.get('/loop',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	res.render('loop',{title:'loop testing'});
});

app.get('/list',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	res.render('list',{title:'list testing'});
});

app.get('/form',function(req,res){
	if(!req.session.logined){
		res.redirect('login')
	}
	res.locals.logined= req.session.logined;
	res.render('form',{title:'form testing'});
});
app.post('/output',function(req,res){
	res.locals.logined= req.session.logined;
	if(req.body.name.replace(/\s+/g, '').length == 0){
		res.render('form',{
			title:'form testing(error)',
			blankName:' Sorry,名字請勿留白.'
		});
	}
	res.render('output',{
		title:'form testing(output)',
		name:req.body.name,
		lang:req.body.lang,
		otherLang:req.body.otherLang,		
		fruit:req.query.fruit,
		flavor:req.query.flavor
		});
});

app.get('/login',function(req,res){
	if(req.session.logined){
		res.redirect('main')
	}
	res.render('login',{
			errorname:''		
	});
})

app.post('/login_check',function(req,res){
	if(req.body.accountname!='admin' || req.body.accountpwd!='123'){
		var a= req.body.accountname;
		var b= req.body.accountpwd;
		res.render('login',{
			errorname:a,
			errormsg:'*帳號密碼錯誤,請重新輸入'
		});
	}
	req.session.logined= true;
	res.redirect('/main');
})

app.get('/logout',function(req,res){
	req.session.logined= false;
	res.locals.logined= req.session.logined;
	res.redirect('main');
})


//測試QueryString
//方式:網址列輸入'localhost:3000/mydir?name=123&pwd=321'
app.get('/mydir',function(req,res){
	res.send('Name: '+req.query.name);

	//此行會出現在console端
	console.log('password: '+req.query.pwd);
})

//測試Route Parameter
//方式:網址列輸入'localhost:3000/mydir/321'
app.get('/mydir/:name',function(req,res){
	res.send('Name: '+req.params.name);
})



app.listen(3000);
console.log('port listening at port 3000');

