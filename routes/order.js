const express=require('express');
const router=express.Router();
const pool=require('./pool');
router.post('/shipping_address',(req,res)=>{
    const query=`insert into shipping_address set ?`;
    pool.query(query,req.body,(err,result)=>{
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