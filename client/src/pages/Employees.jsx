import { 
  useEffect, 
  useState 
} from "react";

import { 
  Link 
} from "react-router-dom";

import { 
  useContext 
} from "react";

import { 
  AuthContext 
} from "../context/AuthContext";


import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaFileExcel,
  FaFilePdf,
  FaUsers,
  FaUserCheck,
  FaUserTimes
} from "react-icons/fa";


import {
  getEmployees,
  deleteEmployee
} from "../services/employeeService";


import {
  toast
} from "react-toastify";


import Swal from "sweetalert2";


import {
  exportEmployees
} from "../utils/exportEmployees";


import {
  exportPDF
} from "../utils/exportPDF";


import {
  debounce
} from "lodash";


import Loader from "../components/Loader";



export default function Employees(){


const {isAdmin}=useContext(AuthContext);



const [employees,setEmployees]=useState([]);

const [loading,setLoading]=useState(true);

const [exporting,setExporting]=useState(false);



const [search,setSearch]=useState("");

const [department,setDepartment]=useState("All");

const [status,setStatus]=useState("All");



const [currentPage,setCurrentPage]=useState(1);


const employeesPerPage=5;



const API_URL =
import.meta.env.VITE_API_URL || "http://localhost:5000";





useEffect(()=>{

loadEmployees();

},[]);





async function loadEmployees(){

try{

setLoading(true);


const res=await getEmployees();


setEmployees(
res.data.employees || []
);


}

catch(error){

console.log(error);

toast.error(
"Failed to load employees"
);

}

finally{

setLoading(false);

}

}






const handleSearch=debounce((value)=>{

setSearch(value);

setCurrentPage(1);


},500);








async function handleDelete(id){


const result=await Swal.fire({

title:"Delete Employee?",

text:"This action cannot be undone",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Delete",

cancelButtonText:"Cancel",

confirmButtonColor:"#dc2626"

});



if(!result.isConfirmed)
return;



try{


await deleteEmployee(id);



setEmployees(prev=>

prev.filter(
emp=>emp._id!==id
)

);



toast.success(
"Employee deleted successfully"
);



}


catch(error){

console.log(error);

toast.error(
"Delete failed"
);

}


}







const departments=[

...new Set(

employees.map(
emp=>emp.department
)

)

];








useEffect(()=>{

setCurrentPage(1);

},[
search,
department,
status
]);







const filteredEmployees =
employees.filter(emp=>{


const name =
emp.name?.toLowerCase() || "";


const email =
emp.email?.toLowerCase() || "";


const id =
emp.employeeId?.toLowerCase() || "";


const dept =
emp.department?.toLowerCase() || "";



const searchText =
search.toLowerCase();



const matchesSearch =

name.includes(searchText)
||
email.includes(searchText)
||
id.includes(searchText)
||
dept.includes(searchText);



const matchesDepartment =

department==="All"
||
emp.department===department;



const matchesStatus =

status==="All"
||
emp.status===status;




return (

matchesSearch
&&
matchesDepartment
&&
matchesStatus

);


});







const indexOfLastEmployee =
currentPage*employeesPerPage;


const indexOfFirstEmployee =
indexOfLastEmployee-employeesPerPage;



const currentEmployees =
filteredEmployees.slice(

indexOfFirstEmployee,

indexOfLastEmployee

);




const totalPages =
Math.ceil(
filteredEmployees.length/
employeesPerPage
);







async function handlePDFExport(){

try{

setExporting(true);

await exportPDF(filteredEmployees);


}

finally{

setExporting(false);

}

}







if(loading){

return <Loader/>;

}







return (

<div className="
p-4
md:p-6
lg:p-8
bg-gray-100
dark:bg-slate-900
min-h-screen
">




<h1 className="
text-2xl
md:text-3xl
font-bold
dark:text-white
">

Employees

</h1>


<p className="
text-gray-500
mb-8
">

Manage employees from one place

</p>






{/* Statistics */}



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
mb-8
">



<div className="
bg-white
dark:bg-slate-800
p-6
rounded-xl
shadow
">

<FaUsers className="
text-blue-600
text-3xl
mb-3
"/>


<h3>
Total Employees
</h3>


<p className="
text-3xl
font-bold
">

{employees.length}

</p>


</div>





<div className="
bg-white
dark:bg-slate-800
p-6
rounded-xl
shadow
">


<FaUserCheck className="
text-green-600
text-3xl
mb-3
"/>


<h3>
Active
</h3>


<p className="
text-3xl
font-bold
">

{
employees.filter(
e=>e.status==="Active"
).length
}

</p>


</div>





<div className="
bg-white
dark:bg-slate-800
p-6
rounded-xl
shadow
">


<FaUserTimes className="
text-red-600
text-3xl
mb-3
"/>


<h3>
Inactive
</h3>


<p className="
text-3xl
font-bold
">

{
employees.filter(
e=>e.status==="Inactive"
).length
}

</p>


</div>



</div>







{/* Header Buttons */}


<div className="
flex
flex-col
sm:flex-row
sm:flex-wrap
gap-3
mb-6
">


<button

onClick={()=>
exportEmployees(filteredEmployees)
}

className="
w-full sm:w-auto justify-center
bg-green-600
text-white
px-4
py-2
rounded-lg
flex
gap-2
items-center
">

<FaFileExcel/>

Excel

</button>





<button

onClick={handlePDFExport}

className="
w-full sm:w-auto justify-center
bg-red-600
text-white
px-4
py-2
rounded-lg
flex
gap-2
items-center
">

<FaFilePdf/>

{
exporting
?
"Exporting..."
:
"PDF"
}

</button>





{
isAdmin &&

<Link

to="/employees/add"

className="
w-full sm:w-auto justify-center
bg-blue-600
text-white
px-5
py-2
rounded-lg
flex
gap-2
items-center
"
>

<FaPlus/>

Add Employee

</Link>

}



</div>








{/* Filters */}



<div className="
bg-white
dark:bg-slate-800
p-5
rounded-xl
shadow
mb-6
">


<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">



<input

placeholder="Search employee..."

className="
w-full
border
rounded-lg
px-4
py-2
"

onChange={
e=>handleSearch(e.target.value)
}

/>





<select

value={department}

onChange={
e=>setDepartment(e.target.value)
}

className="
w-full
border
rounded-lg
px-4
py-2
"

>


<option>
All
</option>


{

departments.map(dep=>(

<option key={dep}>
{dep}
</option>

))

}


</select>





<select

value={status}

onChange={
e=>setStatus(e.target.value)
}

className="
w-full
border
rounded-lg
px-4
py-2
"

>

<option>
All
</option>

<option>
Active
</option>

<option>
Inactive
</option>


</select>




</div>


</div>







{/* Table */}



<div className="
overflow-x-auto
bg-white
dark:bg-slate-800
rounded-xl
shadow
w-full
">



<table className="min-w-[900px] w-full">


<thead className="
bg-blue-600
text-white
">


<tr>

<th className="p-4">
Photo
</th>

<th>
ID
</th>

<th>
Name
</th>

<th>
Email
</th>

<th>
Department
</th>

<th>
Status
</th>

{
isAdmin &&
<th>
Actions
</th>
}


</tr>


</thead>





<tbody>


{

currentEmployees.map(emp=>(


<tr
key={emp._id}
className="
border-b
hover:bg-blue-50
"
>


<td className="p-4">

<img

src={

emp.photo

?

`${API_URL}${emp.photo}`

:

`https://ui-avatars.com/api/?name=${encodeURIComponent(
emp.name || "Employee"
)}`

}

className="
w-12
h-12
rounded-full
"
/>


</td>





<td>
{emp.employeeId}
</td>



<td>

<Link

to={`/employees/${emp._id}`}

className="
text-blue-600
font-semibold
">

{emp.name}

</Link>

</td>




<td>
{emp.email}
</td>



<td>
{emp.department}
</td>




<td>

<span className={

emp.status==="Active"

?

"bg-green-100 text-green-700 px-3 py-1 rounded-full"

:

"bg-red-100 text-red-700 px-3 py-1 rounded-full"

}>

{emp.status}

</span>


</td>




{

isAdmin &&

<td>

<div className="
flex
gap-4
justify-center
">


<Link
to={`/employees/edit/${emp._id}`}
>

<FaEdit
className="
text-blue-600
"
/>

</Link>



<button

onClick={()=>
handleDelete(emp._id)
}

>

<FaTrash
className="
text-red-600
"
/>

</button>



</div>

</td>

}


</tr>


))

}


</tbody>


</table>


</div>







{/* Pagination */}


<div className="
flex
justify-center
gap-2
mt-8
">


{

Array.from(
{length:totalPages},
(_,i)=>(

<button

key={i}

onClick={()=>
setCurrentPage(i+1)
}

className={`px-4 py-2 rounded-lg
${
currentPage===i+1
?
"bg-blue-600 text-white"
:
"bg-white"
}
`}

>

{i+1}

</button>


)

)

}


</div>





</div>


);


}