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
    pool.query(`insert into organization(maincategoryid,subcategoryid,organization,icon) values(?,?,?,?)`, [req.body.maincategoryid,req.body.subcategoryid,req.body.organization,req.body.icon], (err, result) => {
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

 router.get('/fetchallorganization', (req, res) => {
    pool.query("select * from organization", (e, r) => {
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
query=`select * from organization where organizationid=${req.body.cid}`;
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


router.post('/deleterecord', (req, res) => {
    console.log(req.body);
query=`delete from organization where organizationid=${req.body.organizationid}`;
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
         pool.query(`update organization set maincategoryid=?,subcategoryid=?,organization=? where organizationid=?`, [req.body.maincategoryid,req.body.subcategoryid,req.body.organization,req.body.organizationid], (err, result) => {
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
    pool.query(`update organization set icon=? where organizationid=?`, [req.body.icon,req.body.organizationid], (err, result) => {
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

 router.post('/fetchsubcategories', (req, res) => {
    console.log(req.body);
query=`select * from subcategories where maincategoryid=${req.body.cid}`;
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