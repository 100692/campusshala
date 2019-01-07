const express = require('express');
const router = express.Router();
const pool = require('./pool');
var multer=require('./multer')

router.post('/fetchorganization', (req, res) => {
    console.log(req.body);
query=`select * from organization where subcategoryid=${req.body.cid}`;
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

router.post('/fetchsetno', (req, res) => {
    console.log(req.body);
query=`select * from set_exam where organizationid=${req.body.cid}`;
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

router.post('/generatequestionnono', (req, res) => {
    console.log(req.body);
query=`select max(questionno) as questionno from questionpaper where setno=${req.body.setno} and examcategoryid=${req.body.examcategoryid}`;
console.log(query);
    pool.query(query, (e, r) => {
       if(e) {
            console.log(e);
           res.status(500).json([]);
       }
       else {
        console.log(r);
           res.status(200).json(r);
           
       }
   })
});
router.post('/addnewrecord', function(req, res) {
   
    console.log(req.body);
    
      
   pool.query(`insert into questionpaper(organizationid,examcategoryid,setno,questionno,question,option1,option2,option3,option4,answer) values(?,?,?,?,?,?,?,?,?,?)`, [req.body.organizationid,req.body.categoryid,req.body.setno,req.body.questionno,req.body.question,req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.answer], (err, result) => {
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

router.post('/fetchquestionno', (req, res) => {
    console.log(req.body);
query=`select * from questionpaper where  organizationid=${req.body.oid} && setno=${req.body.sn} &&  examcategoryid=${req.body.ecid}`;
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

router.post('/fetchbyid', (req, res) => {
    console.log(req.body);
query=`select * from questionpaper where questionid=${req.body.qid}`;
console.log(query);
    pool.query(query, (e, r) => {
       if(e) {
          
           res.status(500).json([]);
       }
       else {
           console.log(r);
           res.status(200).json(r);
       }
   })
});


router.post('/editrecord', function(req, res) {
    // console.log(req.body.id, req.body.name);
         pool.query(`update questionpaper set question=?,option1=?,option2=?,option3=?,option4=?,answer=? where questionid=?`, [req.body.question,req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.answer,req.body.questionid], (err, result) => {
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