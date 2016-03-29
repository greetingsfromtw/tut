var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
//var session = require('express-session');
var cookieSession = require('cookie-session');
//設定jade為預設render引擎
app.set('views',__dirname + '/views');
app.set('view engine','jade');

//設定靜態網頁路徑
app.use(express.static(__dirname + '/public'));

//設定bodyParser支援application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended:false
}));

//啟用cookie解析器
app.use(cookieParser());

/*
//啟用集中式session.當中的secret是用來加密cookie以防被破解
//缺點:儲存在記憶體中,伺服器重啟後資料就會消失
app.use(session({
	secret:'helloSession',
	resave: true,
    saveUninitialized: true
}));
*/


//啟用cookie session
app.use(cookieSession({
	key:'node',
	secret:'hicookieSession'
}));




app.get('/main',function(req,res){
	res.locals.logined= req.session.logined;
	res.render('main',{title:'main page'});
})

app.get('/table',function(req,res){
	res.locals.logined= req.session.logined;
	res.render('table',{title:'table testing'});
})

app.get('/loop',function(req,res){
	res.locals.logined= req.session.logined;
	res.render('loop',{title:'loop testing'});
})

app.get('/list',function(req,res){
	res.locals.logined= req.session.logined;
	res.render('list',{title:'list testing'});
})

app.get('/form',function(req,res){
	res.locals.logined= req.session.logined;
	res.render('form',{title:'form testing'});
})
app.post('/output',function(req,res){
	res.locals.logined= req.session.logined;
	console.log(req.body.username);
	console.log(req.body.pwd);
	res.render('output',{
		title:'form testing(output)',
		username:req.body.username,
		pwd:req.body.pwd,
		fruit:req.query.fruit,
		flavor:req.query.flavor
		});
});

app.get('/login',function(req,res){
	if(req.session.logined){
		res.redirect('main')
	}

	res.render('login');
})

app.post('/login_check',function(req,res){
	if(req.body.accountname!='admin' || req.body.accountpwd!='123'){
		res.render('login',{
			error:'帳號密碼錯誤,請重新輸入'
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

/*
//集中式session實作
//測試時將集中式session的middleware反註解

app.get('/mysession',function(req,res){
	
	//檢查session裡的count是否存在
	if(req.session.count){
		
		//將count加一
		req.session.count++;
	}else{

		//將count初始值設為一
		req.session.count=1;
	}

	//將目前count欄位內的值傳回給瀏覽器
	res.sendStatus(req.session.count);
	res.end();
});
*/

app.listen(3000);
console.log('port listening at port 3000');

