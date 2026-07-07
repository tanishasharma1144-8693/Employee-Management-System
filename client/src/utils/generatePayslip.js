import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export function generatePayslip(data) {


const doc = new jsPDF();


const employee = data.employee || {};



// Safe values

const name =
employee.name || "Employee";


const employeeId =
employee.employeeId || "N/A";


const department =
employee.department || "N/A";


const email =
employee.email || "N/A";


const month =
data.month || "N/A";


const year =
data.year || new Date().getFullYear();



const basicSalary =
data.basicSalary || 0;


const bonus =
data.bonus || 0;


const deduction =
data.deduction || 0;


const netSalary =
data.netSalary ||
basicSalary + bonus - deduction;




// ================= HEADER =================


doc.setFillColor(30,64,175);

doc.rect(
0,
0,
210,
35,
"F"
);



doc.setTextColor(
255,
255,
255
);


doc.setFontSize(22);


doc.text(
"EMPLOYEE PAYSLIP",
65,
15
);



doc.setFontSize(12);


doc.text(
"Employee Management System",
70,
25
);



// Reset color

doc.setTextColor(
0,
0,
0
);




// ================= COMPANY DETAILS =================



doc.setFontSize(12);


doc.text(
"ABC Technologies Pvt Ltd",
20,
50
);


doc.text(
"Payroll Department",
20,
58
);


doc.text(
`Generated Date: ${new Date().toLocaleDateString()}`,
20,
66
);



doc.line(
20,
72,
190,
72
);






// ================= EMPLOYEE DETAILS =================



doc.setFontSize(15);


doc.text(
"Employee Details",
20,
88
);



autoTable(doc, {


startY:95,


theme:"grid",


head:[

[
"Field",
"Details"
]

],


body:[


[
"Employee ID",
employeeId
],


[
"Name",
name
],


[
"Department",
department
],


[
"Email",
email
],


[
"Salary Month",
month
],


[
"Year",
year
]


]


});







// ================= SALARY DETAILS =================



const salaryStart =
doc.lastAutoTable.finalY + 20;



doc.setFontSize(15);


doc.text(
"Salary Breakdown",
20,
salaryStart
);




autoTable(doc,{


startY:
salaryStart + 8,


theme:"grid",


head:[

[
"Component",
"Amount"
]

],


body:[


[
"Basic Salary",
`Rs ${basicSalary}`
],


[
"Bonus",
`Rs ${bonus}`
],


[
"Deduction",
`Rs ${deduction}`
],


[
"Net Salary",
`Rs ${netSalary}`
],


[
"Payment Status",
data.paymentStatus || "Pending"
]


]


});








// ================= SIGNATURE =================



const footerY = 250;



doc.setFontSize(11);



doc.text(

"Authorized Signature",

140,

footerY

);



doc.line(

140,

footerY+5,

190,

footerY+5

);





doc.text(

"This is a computer generated payslip",

20,

footerY+15

);






// ================= DOWNLOAD =================



doc.save(

`${name.replace(/\s+/g,"_")}_Payslip.pdf`

);



}