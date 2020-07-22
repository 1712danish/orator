const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;


const eventSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    organisation:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
    
    
});

exports.Event = mongoose.model("Event",eventSchema);