const mongoose = require("mongoose")

const complaintsSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    complaint:{
        type: String,
        required: true
    }
    
})

const Complaints=mongoose.model("Complaint", complaintsSchema)
module.exports=Complaints;