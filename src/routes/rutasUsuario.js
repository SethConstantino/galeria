const express=require('express');
const res = require('express/lib/response');
const router= express.Router();
const path = require('path');

router.get('/',(req,res,next)=>{
    res.render('index');
});

module.exports=router