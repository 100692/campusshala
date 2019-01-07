const express = require('express');
const router = express.Router();
const pool = require('./pool');

 
router.post('/addnewrecord', function(req, res) {
   
     console.log(req.body);
     
       
    pool.query(`insert into set_exam(setno,organizationid,setorg,duration) values(?,?,?,?)`, [req.body.setno,req.body.organizationid,req.body.setorg,req.body.duration], (err, result) => {
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


 router.post('/generatesetno', (req, res) => {
    console.log(req.body);
query=`select max(setno) as setno from set_exam where organizationid=${req.body.cid}`;
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

  
 module.exports = router;