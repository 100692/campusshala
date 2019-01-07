const express = require('express');
const router = express.Router();
const pool = require('./pool');
var multer=require('./multer')


router.post('/checkadminlogin', (req, res) => {
    console.log(req.body);
query=`select * from admin where adminid='${req.body.adminid}' and password='${req.body.password}'`;
console.log(query);
    pool.query(query, (e, r) => {
       if(e) {
          
           res.status(500).json({RESULT:false});
       }
       else {
           console.log(r.length);
           if(r.length==0)
           res.status(200).json({RESULT:false});
           else
           res.status(200).json({RESULT:r});
       }
   })
});

module.exports = router;