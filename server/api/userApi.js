var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConfig = require('../DB/DBManager');
//数据库连接池
var pool = mysql.createPool(dbConfig);

router.use('/login',(req,res)=>{
    console.log(req.query);
})

module.exports = router;
