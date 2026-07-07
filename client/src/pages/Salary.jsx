import {
  useEffect,
  useState
} from "react";


import {
  FaTrash,
  FaMoneyBillWave,
  FaDownload,
  FaUsers,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";


import {
  getSalaries,
  deleteSalary
} from "../services/salaryService";


import {
  toast
} from "react-toastify";


import {
  generatePayslip
} from "../utils/generatePayslip";


import Loader from "../components/Loader";



export default function Salary(){


const [salary,setSalary]=useState([]);

const [loading,setLoading]=useState(true);




useEffect(()=>{

loadSalary();

},[]);





async function loadSalary(){


try{


setLoading(true);


const res =
await getSalaries();



setSalary(
res.data.salaries || []
);



}

catch(error){

console.log(error);

toast.error(
"Failed loading salary"
);


}

finally{

setLoading(false);

}


}








async function removeSalary(id){


const confirm =
window.confirm(
"Are you sure you want to delete this salary record?"
);


if(!confirm)
return;



try{


await deleteSalary(id);



setSalary(prev=>

prev.filter(
item=>item._id!==id
)

);



toast.success(
"Salary deleted successfully"
);



}

catch(error){


console.log(error);


toast.error(
"Delete failed"
);


}


}






const totalPayroll =
salary.reduce(

(sum,item)=>
sum + (item.netSalary || 0),

0

);




const paidEmployees =
salary.filter(

item=>
item.paymentStatus==="Paid"

).length;





const pendingEmployees =
salary.filter(

item=>
item.paymentStatus==="Pending"

).length;








if(loading){

return <Loader/>;

}






return (


<div className="
p-8
bg-gray-100
dark:bg-slate-900
min-h-screen
">





<h1 className="
text-3xl
font-bold
mb-8
dark:text-white
">

Salary Management

</h1>







{/* Summary Cards */}



<div className="
grid
md:grid-cols-3
gap-6
mb-8
">






<div className="
bg-white
dark:bg-slate-800
rounded-xl
shadow
p-6
">


<FaMoneyBillWave

className="
text-green-600
text-4xl
mb-4
"

/>


<h3 className="
text-gray-500
">

Total Payroll

</h3>


<p className="
text-3xl
font-bold
dark:text-white
">

₹{totalPayroll}

</p>


</div>







<div className="
bg-green-50
rounded-xl
p-6
">


<FaCheckCircle

className="
text-green-600
text-4xl
mb-4
"

/>


<h3>

Paid Employees

</h3>


<p className="
text-3xl
font-bold
">

{paidEmployees}

</p>


</div>







<div className="
bg-yellow-50
rounded-xl
p-6
">


<FaClock

className="
text-yellow-600
text-4xl
mb-4
"

/>


<h3>

Pending Payments

</h3>


<p className="
text-3xl
font-bold
">

{pendingEmployees}

</p>


</div>




</div>










{/* Salary Table */}




<div className="
bg-white
dark:bg-slate-800
rounded-xl
shadow
overflow-x-auto
">





<table className="w-full">



<thead

className="
bg-blue-600
text-white
"

>


<tr>


<th className="p-4 text-left">

Employee

</th>



<th>

Month

</th>



<th>

Basic Salary

</th>



<th>

Bonus

</th>



<th>

Deduction

</th>



<th>

Net Salary

</th>



<th>

Status

</th>



<th>

Action

</th>


</tr>


</thead>








<tbody>


{


salary.length > 0 ?



salary.map(item=>(



<tr

key={item._id}

className="
border-b
hover:bg-blue-50
dark:hover:bg-slate-700
"

>





<td className="
p-4
flex
items-center
gap-3
">


<FaMoneyBillWave

className="
text-green-600
"

/>



<span>

{
item.employee?.name || "Unknown"
}

</span>


</td>







<td>

{item.month}

</td>







<td>

₹{item.basicSalary}

</td>







<td>

₹{item.bonus}

</td>







<td>

₹{item.deduction}

</td>







<td className="
font-bold
">

₹{item.netSalary}

</td>







<td>


<span

className={

item.paymentStatus==="Paid"

?

"bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

:

"bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"

}

>


{item.paymentStatus}


</span>


</td>








<td>


<div className="
flex
gap-4
items-center
">





<button


onClick={()=>generatePayslip(item)}


className="
text-blue-600
flex
items-center
gap-2
font-semibold
"


>


<FaDownload/>


PDF


</button>









<button


onClick={()=>
removeSalary(item._id)
}


>


<FaTrash

className="
text-red-600
text-lg
"

/>


</button>





</div>


</td>





</tr>



))




:




<tr>

<td

colSpan="8"

className="
text-center
py-10
text-gray-500
"

>

No Salary Records Found

</td>


</tr>



}



</tbody>



</table>





</div>





</div>



);


}