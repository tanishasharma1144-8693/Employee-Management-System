const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema(

{

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},


action:{
type:String,
required:true
},


description:{
type:String,
required:true
},


module:{
type:String,
default:"System"
},


ipAddress:{
type:String
}


},

{
timestamps:true
}

);


module.exports =
mongoose.model(
"ActivityLog",
activitySchema
);