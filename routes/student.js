var express = require('express');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/student-list', function(req, res, next) {
    var sql='SELECT * FROM Atheletes';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('student-list', { title: 'Stu List', userData: data});
  }); 
});


//router.get('/formtest', function(req,res,next)
//{
//res.render('/student-list');
//});

router.post('/insertdata', function(req,res,next)
{
//const StuDetail=req.body;
db.query('INSERT INTO Atheletes(A_Name,A_Gender,A_Sport,A_Level,A_Email,A_Phone) VALUES(?,?,?,?,?,?)', [req.body.name, req.body.gender, req.body.sport, req.body.level, req.body.email, req.body.phone], function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
  });
    res.redirect('/student/student-list');

});
module.exports = router;