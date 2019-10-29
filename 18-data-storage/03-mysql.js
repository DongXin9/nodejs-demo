#!/usr/bin/node

const mysql = require('mysql'),
      con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'ddd',
        database:'test'
      });
con.connect();

//增
/*con.query('insert into books(book_id,title,status) values(?,?,?)',['104','node.js',0],(err, result)=>{
  if(err){
    console.error(err.message);
    process.exit(1);
  }
  process.exit();
});*/


//删
/*con.query('delete from books where book_id = ?',[104],(err, result)=>{
  if(err){
    console.error(err.message);
    process.exit(1);
  }
  process.exit();
});*/


//改
/*con.query('update books set title = ? where book_id = ?',['bye','103'],(err, result)=>{
  if(err){
    console.error(err.message);
    process.exit(1);
  }
  process.exit();
});*/


//查
/*con.query('select * from books',(err, result)=>{
  if(err){
    console.error(err.message);
    process.exit(1);
  }
  console.log(result);
  process.exit();
});*/

