/*
    提供相应的SQL语句
*/

var sqlMap = {
    user: {
        add: 'insert into manager (username,password) values (?,?)',
        dele: 'delete from manager where username='
    }
}