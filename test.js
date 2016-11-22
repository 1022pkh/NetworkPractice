var express =   require("express");
var formidable = require('formidable');
var fs = require('fs-extra'); // 파일을 복사하거나 디렉토리를 복사하는 모듈
var mysql = require('mysql'); //mysql module
var router =express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'pkh1022',
    database:'practice'
});
//이렇게 명시적으로 connect 메서드를 이용해서 connection을 연결하거나 또는 첫번째 Query가 실행될 때, 위의 connection 객체의 정보를 이용해서 connection이 생성된다.
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});


//서버 생성
var app =   express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/',function(req,res){
    sess = req.session;
    res.send("Hello!");
});


app.get('/notice', function(req, res, next) {

    console.log("Request Get notice");

    //select count(user_id) from members where user_id='pkh1022';
    var query = connection.query('select * from notice',function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }

        // console.log(result);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            result : result
        }));

        
    });
});


app.get('/notice/:notice_id', function(req, res, next) {
    var notice_id = req.params.notice_id;


    console.log("Request Get Detail notice");

    //select count(user_id) from members where user_id='pkh1022';
    var query = connection.query('select * from notice where id= ?',notice_id,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }

        // console.log(result);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            result : result
        }));

        
    });

});

app.delete('/notice/:notice_id', function(req, res, next) {
    var notice_id = req.params.notice_id;

    console.log("Request Delete notice");

    //select count(user_id) from members where user_id='pkh1022';
    var query = connection.query('delete from notice where id= ?',notice_id,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }

        // console.log(result);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            result : result
        }));

        
    });

});


app.post('/notice/register', function(req, res, next) {

    console.log("Request Post register");

    var title = req.body.title;
    var content = req.body.content;

    console.error(title);
    console.error(content);

    var post  = {title: title, content: content};

    var query = connection.query('insert into notice set ?',post,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }

        // console.log(result);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            { result : "success" }
        ));

        
    });

    

});



//연결 테스트
app.get('/connect',function(req,res){
      // res.end("GET TEST Success!");
    console.log("GET TEST Success!");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result : "success" }, null, 3));
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
