const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const volunteerSchema = mongoose.Schema({
    
    volunteeredTo:{
        type:ObjectId,
        ref:"adminEvent"
    },
    volunteeredBy:{
        type:ObjectId,
        ref:"User"
    }

})

exports.Volunteer = mongoose.model("Volunteer",volunteerSchema);