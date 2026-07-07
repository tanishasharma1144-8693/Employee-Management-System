const express=require("express");

const router=express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {

addSalary,

getSalaries,

getEmployeeSalary,

deleteSalary

}=require("../controllers/salaryController");





router.post(
"/",
authMiddleware,
addSalary
);



router.get(
"/",
authMiddleware,
getSalaries
);



router.get(
"/employee/:id",
authMiddleware,
getEmployeeSalary
);



router.delete(
"/:id",
authMiddleware,
deleteSalary
);



module.exports=router;