const express = require('express');
const router = express.Router();
const pool = require('./pool');
var multer=require('./multer')
 
router.post('/addnewrecord',multer.single('icon'), function(req, res) {
    // console.log(req.body.id, req.body.name);
     console.log(req.body);
     console.log(req.file)
     


    var body = req.body;
     body['icon'] = req.file.filename;
    pool.query(`insert into examcategory(examcategory,icon) values(?,?)`, [req.body.examcategory,req.body.icon], (err, result) => {
   //or  
  // pool.query(`insert into products set ?`, body, (err, result) => {
     
    if(err) {
        console.log(err);
       return res.status(500).json({RESULT:false});
    } else {
        return res.status(200).json({RESULT:true});
    }


     })
      
 });

 router.get('/fetchallexamcategories', (req, res) => {
    pool.query("select * from examcategory", (e, r) => {
       if(e) {
          
           res.status(500).json([]);
       }
       else {
           res.status(200).json(r);
       }
   })
});
 
router.post('/fetchbyid', (req, res) => {
    console.log(req.body);
query=`select * from examcategory where examcategoryid=${req.body.cid}`;
console.log(query);
    pool.query(query, (e, r) => {
       if(e) {
          
           res.status(500).json([]);
       }
       else {
           res.status(200).json(r);
       }
   })
});


router.post('/deleterecord', (req, res) => {
    console.log(req.body);
query=`delete from examcategory where examcategoryid=${req.body.examcategoryid}`;
console.log(query);
    pool.query(query, (e, r) => {
        if(e) {
            console.log(e);
           return res.status(500).json({RESULT:false});
        } else {
            return res.status(200).json({RESULT:true});
        }
   })
});


router.post('/editrecord', function(req, res) {
    // console.log(req.body.id, req.body.name);
         pool.query(`update examcategory set examcategory=? where examcategoryid=?`, [req.body.examcategory,req.body.examcategoryid], (err, result) => {
   //or  
  // pool.query(`insert into products set ?`, body, (err, result) => {
     
    if(err) {
        console.log(err);
       return res.status(500).json({RESULT:false});
    } else {
        return res.status(200).json({RESULT:true});
    }

     })
      
 });

 router.post('/editicon',multer.single('icon'), function(req, res) {
    // console.log(req.body.id, req.body.name);
     console.log(req.body);
     console.log(req.file)
     
     var body = req.body;
     body['icon'] = req.file.filename;
    pool.query(`update examcategory set icon=? where examcategoryid=?`, [req.body.icon,req.body.examcategoryid], (err, result) => {
   //or  
  // pool.query(`insert into products set ?`, body, (err, result) => {
     
    if(err) {
        console.log(err);
       return res.status(500).json({RESULT:false});
    } else {
        return res.status(200).json({RESULT:true});
    }

     })
      
 });
 
 module.exports = router;