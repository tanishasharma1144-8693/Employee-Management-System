const Notification=require("../models/Notification");

// Get Notifications

exports.getNotifications=async(req,res)=>{

try{

const notifications=
await Notification.find()
.sort({createdAt:-1})
.limit(20);

res.status(200).json({

success:true,
notifications

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


// Create Notification

exports.createNotification=async(req,res)=>{

try{

const notification=
await Notification.create(req.body);

res.status(201).json({

success:true,
notification

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


// Mark Read

exports.markRead=async(req,res)=>{

try{

const notification=
await Notification.findByIdAndUpdate(

req.params.id,

{
isRead:true
},

{
new:true
}

);

res.status(200).json({

success:true,
notification

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