import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  useParams,
  useNavigate,
  Link
} from "react-router-dom";


import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMoneyBillWave,
  FaCalendarAlt
} from "react-icons/fa";


import {
  toast
} from "react-toastify";


import Swal from "sweetalert2";


import {
  getEmployeeById,
  deleteEmployee
} from "../services/employeeService";


import {
  AuthContext
} from "../context/AuthContext";


import Loader from "../components/Loader";



export default function EmployeeProfile(){


const {
id
}=useParams();


const navigate=useNavigate();


const {
isAdmin
}=useContext(AuthContext);



const [employee,setEmployee]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

loadEmployee();

},[]);





async function loadEmployee(){


try{


setLoading(true);


const res =
await getEmployeeById(id);



setEmployee(
res.data.employee
);



}

catch(error){

console.log(error);

toast.error(
"Unable to load employee"
);


}


finally{

setLoading(false);

}


}








async function handleDelete(){


const result =
await Swal.fire({

title:"Delete Employee?",

text:"This employee will be removed permanently",

icon:"warning",

showCancelButton:true,

confirmButtonColor:"#dc2626"

});



if(!result.isConfirmed)
return;



try{


await deleteEmployee(id);


toast.success(
"Employee deleted"
);



navigate("/employees");



}

catch(error){

toast.error(
"Delete failed"
);

}



}






if(loading)
return <Loader/>;



if(!employee)
return null;






return (


<div className="
p-8
bg-gray-100
dark:bg-slate-900
min-h-screen
">





{/* Back Button */}


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
mb-6
text-blue-600
"

>

<FaArrowLeft/>

Back

</button>









<div className="
bg-white
dark:bg-slate-800
rounded-xl
shadow
p-8
">





{/* Header */}


<div className="
flex
flex-col
md:flex-row
items-center
gap-8
">





<img

src={

employee.photo

?

`http://localhost:5000${employee.photo}`

:

`https://ui-avatars.com/api/?name=${employee.name}`

}

className="
w-40
h-40
rounded-full
border-4
object-cover
"

/>






<div>


<h1 className="
text-4xl
font-bold
dark:text-white
">

{employee.name}

</h1>


<p className="
text-gray-500
mt-2
">

{employee.designation}

</p>



<span

className={

employee.status==="Active"

?

"inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full"

:

"inline-block mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-full"

}

>

{employee.status}

</span>



</div>







{
isAdmin &&

<div className="
md:ml-auto
flex
gap-4
">


<Link

to={`/employees/edit/${employee._id}`}

className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
flex
items-center
gap-2
"

>

<FaEdit/>

Edit

</Link>




<button

onClick={handleDelete}

className="
bg-red-600
text-white
px-5
py-3
rounded-lg
flex
items-center
gap-2
"

>

<FaTrash/>

Delete

</button>



</div>

}




</div>










{/* Information Cards */}



<div className="
grid
md:grid-cols-2
gap-6
mt-10
">







<div className="
bg-gray-50
dark:bg-slate-700
p-6
rounded-xl
">


<h2 className="
text-xl
font-bold
mb-5
">

Personal Information

</h2>



<Info

icon={<FaEnvelope/>}

title="Email"

value={employee.email}

/>



<Info

icon={<FaPhone/>}

title="Phone"

value={employee.phone}

/>



<Info

icon={<FaBuilding/>}

title="Department"

value={employee.department}

/>



</div>









<div className="
bg-gray-50
dark:bg-slate-700
p-6
rounded-xl
">


<h2 className="
text-xl
font-bold
mb-5
">

Professional Details

</h2>



<Info

icon={<FaMoneyBillWave/>}

title="Salary"

value={`₹ ${employee.salary}`}

/>




<Info

icon={<FaCalendarAlt/>}

title="Joining Date"

value={
new Date(employee.joiningDate)
.toDateString()
}

/>



<Info

icon={<FaBuilding/>}

title="Employee ID"

value={employee.employeeId}

/>




</div>





</div>








{/* Address */}



<div className="
mt-8
bg-gray-50
dark:bg-slate-700
p-6
rounded-xl
">


<h2 className="
text-xl
font-bold
mb-3
">

Address

</h2>


<p>

{employee.address || "No address added"}

</p>


</div>







</div>



</div>


);

}








function Info({
icon,
title,
value
}){


return (

<div className="
flex
items-center
gap-4
mb-5
">


<div className="
text-blue-600
text-xl
">

{icon}

</div>


<div>

<p className="
text-gray-500
">

{title}

</p>


<p className="
font-semibold
">

{value || "N/A"}

</p>


</div>



</div>

)

}