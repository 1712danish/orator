const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;


const adminEventSchema = mongoose.Schema({
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
    createdate:{
        type:Date,
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
});

exports.adminEvent = mongoose.model("adminEvent",adminEventSchema);