const express=require('express');
const router=express.Router();
const pool = require('./pool');

const tableName='users';
//for addnewuser
router.post('/addnewrecord',(req,res)=>{
    console.log(req.body);
    
    const query = `insert into ${tableName} set ? `;
    pool.query(query, req.body, (err) => {
        if (err) {
            console.log(err)
            res.status(200).json({
                result: false
            })
        } else {
           res.status(200).json({
                result: true
            })
        }
    })
})
//check user login or not
router.post('/checkuserlogin', (req, res) => {
    const {
        user_name,
        password
    } = req.body;
    const query = `select * from ${tableName} where (email = ? or mobile = ?) and password = ?  and status=1`
    
    pool.query(query, [user_name, user_name, password], (err, result) => {
        if (err) { 
            console.log(err);
             res.status(200).json({result:false});
        } else { 
        
            if(result.length==0)
           res.status(200).json({result:false});
           else
           res.status(200).json({result:result});
        }
    })
})
//get all users
router.get(`/fetchallusers`,(req,res,next)=>{
    const query=`select * from ${tableName}`;
    pool.query(query,(err,result)=>{
        if(err)
        {
            console.log(err);
            
              res.status(500).json([]);
        }
        else{
              res.status(200).json(result);
        }
    })
})
//fetch by id 
router.post(`/fetchbyuserid`, (req, res, next) => {
    
    
    const query=`select * from ${tableName} where ?`;
    pool.query(query,[req.body],(err,result)=>{
        
        
        if(err)
        {
            console.log(err);
            
            res.status(500).json([]);
        }
        else{ console.log(result);
        
            res.status(200).json(result);
        }
    })
})
//edit user by id
router.post(`/editrecord`,(req,res)=>{
    console.log(req.body);
    
    const {user_id}=req.body;
    const query=`Update ${tableName} set ? where user_id=?`;
    pool.query(query,[req.body,user_id],(err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(500).json([])
        }
        else{
            res.status(200).json(result);
        }
    })
})
// delete user by id
router.post(`/deleterecord`,(req,res,next)=>{
    const query=`delete from ${tableName} where ? `;
    pool.query(query,req.body,(err,result)=>{
        if(err)
        {
            console.log(err);
            
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
})
module.exports=router;