const express= require("express")
const ejs= require("ejs")
const path=require("path")
const mongoose = require('mongoose');

const Complaint=require("./models/complaints.js")
const complaintRoutes=require("./routes/complaintsRouter.js");
const { ObjectId,bson } = require("mongodb");
const app=express()


app.use("/complaints",complaintRoutes)

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
app.post("/allComplaints",async(req,res)=>{
    let name= req.body.Name
    let mobile=req.body.mobile
    let address=req.body.address
    let complaint=req.body.complaint
    
    const newComplaint= new Complaint({name,mobile,address,complaint})
    await newComplaint.save().then(
        res.redirect("/complaints")
    )
    .catch((err)=>{
        console.log("Error is :"+err)
    }) 
})

app.get("/searchComplaints",async(req,res)=>{
    
    if(req.query._id){
        console.log(req.query)
        const id=req.query
       const target=await Complaint.findById(id).exec();
        console.log(target)
        res.render("searchComplaints.ejs",{target})
    }else {
        target= undefined
        res.render("searchComplaints.ejs",{target})
    }
    
    
})







app.listen(80,()=>{
    console.log("App is listening on port 80")
})