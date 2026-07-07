const mongoose = require("mongoose");


const salarySchema = new mongoose.Schema(

{

employee:{
type:mongoose.Schema.Types.ObjectId,
ref:"Employee",
required:true
},


month:{
type:String,
required:true
},


year:{
type:Number,
required:true
},


basicSalary:{
type:Number,
required:true
},


bonus:{
type:Number,
default:0
},


deduction:{
type:Number,
default:0
},


netSalary:{
type:Number
},


paymentStatus:{
type:String,
enum:[
"Paid",
"Pending"
],
default:"Pending"
}


},

{
timestamps:true
}

);



// Calculate salary before save

salarySchema.pre(
"save",
function(next){


this.netSalary =
this.basicSalary
+
this.bonus
-
this.deduction;


next();


}

);



module.exports =
mongoose.model(
"Salary",
salarySchema
);