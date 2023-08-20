const express= require("express")
const ejs= require("ejs")
const path=require("path")
const mongoose = require('mongoose');
const Complaint=require("./models/complaints.js")




const app=express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))


mongoose.connect('mongodb://127.0.0.1:27017/Police')
.then(()=>{
    console.log("connection to mongoDB estabilished")
})
.catch((e)=>{
    console.log("Could not connect to mongoDB"+e)
})

const views= path.join(__dirname,"/views")
const public=path.join(__dirname,"/public")
app.set("view engine","ejs")
app.set("views",views)
app.use(express.static(public))



app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.post("/newComplaint",async(req,res)=>{
    let name= req.body.Name
    let mobile=req.body.mobile
    let address=req.body.address
    let complaint=req.body.complaint
    
    const newComplaint= new Complaint({name,mobile,address,complaint})
    await newComplaint.save().then(
        res.redirect("/newComplaint")
    )
    .catch((err)=>{
        console.log("Error is :"+err)
    }) 
})

app.get("/newComplaint",async(req,res)=>{
    const complaints=await Complaint.find({})
    console.log(complaints);
   
    res.render("newComplaint.ejs",{complaints})
})








app.listen(80,()=>{
    console.log("App is listening on port 80")
})