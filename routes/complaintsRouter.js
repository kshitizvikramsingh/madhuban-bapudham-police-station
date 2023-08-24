const express=require("express")
const mongoose = require('mongoose');
const Complaint=require("../models/complaints.js")
const router = express.Router()

router.get("/",async(req,res)=>{
    if(req.query.code){
        const complaints=await Complaint.find({})
        console.log(complaints);
        res.render("allComplaints.ejs",{complaints})

    }
    else{
        res.send("Please login to view this page")
    }
   
})

router.get("/edit",async(req,res)=>{
    const id=req.body._id
    const editComplaint=await Complaint.find({_id:`${id}`})
   console.log(editComplaint)
    res.render("searchComplaints.ejs",{target})
})









module.exports=router   