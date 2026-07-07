const fs = require("fs");
const path = require("path");

const Employee = require("../models/Employee");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");


// ================= DELETE OLD PHOTO =================

const deletePhoto = (photoPath)=>{

if(!photoPath) return;


const filePath = path.join(
__dirname,
"..",
photoPath
);


if(fs.existsSync(filePath)){

fs.unlinkSync(filePath);

}

};





// ================= ADD EMPLOYEE =================


exports.addEmployee = async(req,res)=>{

try{


const {
employeeId,
name,
email,
phone,
department,
designation,
salary,
joiningDate,
status
}=req.body;



if(
!employeeId ||
!name ||
!email ||
!phone ||
!department ||
!designation ||
!salary ||
!joiningDate
){

return res.status(400).json({

success:false,

message:"All required fields are required"

});

}





const existingEmployee =
await Employee.findOne({

$or:[

{employeeId},

{email}

]

});



if(existingEmployee){

return res.status(400).json({

success:false,

message:"Employee ID or Email already exists"

});


}





const employee =
await Employee.create({


employeeId,

name,

email,

phone,

department,

designation,

salary,

joiningDate,

status,


photo:req.file
?
`/uploads/avatars/${req.file.filename}`
:
""



});




// Activity

await Activity.create({

user:req.user._id,

action:"ADD",

description:
`${req.user.name} added employee ${employee.name}`,

type:"ADD"


});




// Notification

await Notification.create({

title:"Employee Added",

message:
`${employee.name} was added successfully.`,

type:"success"

});




res.status(201).json({

success:true,

message:"Employee added successfully",

employee

});



}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Server Error"

});


}


};









// ================= GET ALL EMPLOYEES =================


exports.getEmployees = async(req,res)=>{


try{


const page =
parseInt(req.query.page)||1;


const limit =
parseInt(req.query.limit)||5;


const search =
req.query.search || "";



const query={

$or:[

{
name:{
$regex:search,
$options:"i"
}
},

{
email:{
$regex:search,
$options:"i"
}
},


{
department:{
$regex:search,
$options:"i"
}
},


{
employeeId:{
$regex:search,
$options:"i"
}
}


]

};




const employees =
await Employee.find(query)

.sort({

createdAt:-1

})

.skip(
(page-1)*limit
)

.limit(limit);




const totalEmployees =
await Employee.countDocuments(query);



res.status(200).json({

success:true,

employees,

totalEmployees,

currentPage:page,

totalPages:
Math.ceil(totalEmployees/limit)

});



}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Server Error"

});


}


};









// ================= GET EMPLOYEE BY ID =================


exports.getEmployeeById = async(req,res)=>{


try{


const employee =
await Employee.findById(
req.params.id
);



if(!employee){

return res.status(404).json({

success:false,

message:"Employee not found"

});


}



res.json({

success:true,

employee

});



}
catch(error){

res.status(500).json({

success:false,

message:"Server Error"

});

}


};









// ================= UPDATE EMPLOYEE =================



exports.updateEmployee = async(req,res)=>{


try{


const employee =
await Employee.findById(
req.params.id
);



if(!employee){

return res.status(404).json({

success:false,

message:"Employee not found"

});

}



const updateData={

employeeId:req.body.employeeId,

name:req.body.name,

email:req.body.email,

phone:req.body.phone,

department:req.body.department,

designation:req.body.designation,

salary:req.body.salary,

joiningDate:req.body.joiningDate,

status:req.body.status

};





if(req.file){

deletePhoto(
employee.photo
);


updateData.photo =
`/uploads/avatars/${req.file.filename}`;


}






const updatedEmployee =
await Employee.findByIdAndUpdate(

req.params.id,

updateData,

{
new:true,
runValidators:true
}

);






await Activity.create({

user:req.user._id,

action:"UPDATE",

description:
`${req.user.name} updated employee ${updatedEmployee.name}`,

type:"UPDATE"


});





await Notification.create({

title:"Employee Updated",

message:
`${updatedEmployee.name} information updated.`,

type:"info"


});





res.json({

success:true,

message:"Employee updated successfully",

employee:updatedEmployee


});



}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Server Error"

});


}


};









// ================= DELETE EMPLOYEE =================



exports.deleteEmployee = async(req,res)=>{


try{


const employee =
await Employee.findById(
req.params.id
);



if(!employee){

return res.status(404).json({

success:false,

message:"Employee not found"

});


}




deletePhoto(
employee.photo
);






await Activity.create({

user:req.user._id,

action:"DELETE",

description:
`${req.user.name} deleted employee ${employee.name}`,

type:"DELETE"


});






await Notification.create({

title:"Employee Deleted",

message:
`${employee.name} deleted.`,

type:"danger"


});





await employee.deleteOne();





res.json({

success:true,

message:"Employee deleted successfully"

});



}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Server Error"

});


}


};









// ================= DASHBOARD STATS =================



exports.dashboardStats = async(req,res)=>{


try{


const totalEmployees =
await Employee.countDocuments();



const activeEmployees =
await Employee.countDocuments({

status:"Active"

});



const inactiveEmployees =
await Employee.countDocuments({

status:"Inactive"

});





const departmentStats =
await Employee.aggregate([

{

$group:{

_id:"$department",

total:{

$sum:1

}

}

},


{

$project:{

_id:0,

department:"$_id",

total:1

}

}

]);






const recentEmployees =
await Employee.find()

.sort({

createdAt:-1

})

.limit(5)

.select(
"name employeeId email department designation status photo createdAt"
);





const salaryStats =
await Employee.aggregate([

{

$group:{

_id:null,


averageSalary:{
$avg:"$salary"
},


highestSalary:{
$max:"$salary"
},


lowestSalary:{
$min:"$salary"
},


totalSalary:{
$sum:"$salary"
}


}

}

]);







res.json({

success:true,


stats:{


totalEmployees,

activeEmployees,

inactiveEmployees,

departmentStats,

recentEmployees,


salaryStats:
salaryStats[0] || {

averageSalary:0,

highestSalary:0,

lowestSalary:0,

totalSalary:0

}


}



});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server Error"

});


}


};