const Salary = require("../models/Salary");



// Add Salary

exports.addSalary = async(req,res)=>{


try{


const salary =
await Salary.create(req.body);



res.status(201).json({

success:true,

salary

});


}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// Get All Salary


exports.getSalaries = async(req,res)=>{


try{


const salaries =
await Salary.find()
.populate(
"employee"
);



res.json({

success:true,

salaries

});


}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};










// Get Employee Salary


exports.getEmployeeSalary =
async(req,res)=>{


try{


const salaries =
await Salary.find({

employee:req.params.id

})
.populate("employee");



res.json({

success:true,

salaries

});


}


catch(error){

res.status(500).json({

message:error.message

});


}


};







// Delete Salary


exports.deleteSalary =
async(req,res)=>{


try{


await Salary.findByIdAndDelete(
req.params.id
);


res.json({

success:true,

message:"Salary deleted"

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};