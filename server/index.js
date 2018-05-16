var router = require('./api/userApi');
var express = require('express');
var app = express();

app.use('/',router);
app.listen(3000,()=>{
    console.log("请在浏览器中输入 http://localhost:3000");
});