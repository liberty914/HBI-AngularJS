var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//post 방식 "/httpTest" 요청 처리 
app.post("/httpTest", function(req, res){
  //요청 파라미터 추출
  var name=req.body.name;
  var addr=req.body.addr;
  //콘솔에 출력
  console.log(name+"/"+addr);
  //응답할 javascript 객체 
  var data={response:"ok Client !"};
  //임시 응답
  res.json(data);
});

app.get("/getList", function(req, res){
  var data=["김구라","해골","원숭이","주뎅이","덩어리"];
  res.json(data);
});

app.get("/jsonpTest", function(req, res){
  //callback 이라는 파라미터로 넘어온값 읽어오기
  var callback=req.query.callback;
  console.log(callback);
  var data=["김구라","해골","원숭이"];
  //jsonp 응답
  res.jsonp(data);
});

/*
    <%
      String callback=request.getParameter("callback");
    %>
    <%=callback%>(["김구라","해골","원숭이"])
*/

app.get("/jsonpTest2", function(req, res){
  var name=req.query.name;
  var addr=req.query.addr;
  console.log(name+"/"+addr);
  res.jsonp({response:"ok Client !"});
});
//셈플 데이터 
var list=[{
  num:0,
  name:"김구라",
  phone:"010-111-2222",
  imgSrc:"/images/image1.png"
},{
  num:1,
  name:"해골",
  phone:"010-111-3333",
  imgSrc:"/images/image2.png"
},{
  num:2,
  name:"원숭이",
  phone:"010-111-4444",
  imgSrc:"/images/image3.png"
}];

app.get("/userList", function(req, res){
  //json 응답 
  res.json(list);
});

//회원정보 1명 요청 처리 
app.get("/getUser", function(req, res){
  var id = parseInt(req.query.userId);
  //id 에 해당되는 회원정보를 얻어와서 
  var obj = list[id];
  //json 응답 
  res.json(obj);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
