import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

import { toast } from "react-toastify";

import api from "../services/api";


export default function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [employee,setEmployee] = useState({

    employeeId:"",
    name:"",
    email:"",
    phone:"",
    department:"",
    designation:"",
    salary:"",
    joiningDate:"",
    status:"Active",

  });



  const [photo,setPhoto] = useState(null);

  const [preview,setPreview] = useState("");



  useEffect(()=>{

    loadEmployee();

  },[]);



  async function loadEmployee(){

    try{

      const res =
      await getEmployeeById(id);


      const data =
      res.data.employee;


      setEmployee({

        employeeId:data.employeeId,

        name:data.name,

        email:data.email,

        phone:data.phone,

        department:data.department,

        designation:data.designation,

        salary:data.salary,

        joiningDate:
        data.joiningDate.split("T")[0],

        status:data.status,

      });



      if(data.photo){

        setPreview(
          `http://localhost:5000${data.photo}`
        );

      }



    }
    catch(err){

      console.log(err);

      toast.error(
        "Unable to fetch employee"
      );

    }

  }





  function handleChange(e){

    setEmployee({

      ...employee,

      [e.target.name]:
      e.target.value

    });

  }





  function handlePhoto(e){

    const file =
    e.target.files[0];


    if(!file) return;



    setPhoto(file);


    setPreview(
      URL.createObjectURL(file)
    );

  }





  async function handleSubmit(e){

    e.preventDefault();


    try{


      const formData =
      new FormData();



      Object.keys(employee)
      .forEach((key)=>{

        formData.append(
          key,
          employee[key]
        );

      });



      if(photo){

        formData.append(
          "photo",
          photo
        );

      }



      await api.put(

        `/employees/${id}`,

        formData,

        {
          headers:{
            "Content-Type":
            "multipart/form-data"
          }
        }

      );



      toast.success(
        "Employee Updated Successfully"
      );

      navigate("/employees");


    }
    catch(err){

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Update Failed"
      );

    }


  }





return (

<div className="min-h-screen bg-gray-100 py-10">


<div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">



<h1 className="text-3xl font-bold mb-8 text-center">

Edit Employee

</h1>





<form

onSubmit={handleSubmit}

className="grid md:grid-cols-2 gap-5"

>



{/* Photo */}


<div className="md:col-span-2 flex flex-col items-center">


<img

src={
preview ||
"https://ui-avatars.com/api/?name=Employee&background=2563eb&color=fff"
}

alt="Employee"

className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"

/>



<input

type="file"

accept="image/*"

onChange={handlePhoto}

className="mt-4"

/>


</div>





<input

name="employeeId"

value={employee.employeeId}

onChange={handleChange}

placeholder="Employee ID"

className="border p-3 rounded-lg"

/>





<input

name="name"

value={employee.name}

onChange={handleChange}

placeholder="Name"

className="border p-3 rounded-lg"

/>





<input

name="email"

value={employee.email}

onChange={handleChange}

placeholder="Email"

className="border p-3 rounded-lg"

/>





<input

name="phone"

value={employee.phone}

onChange={handleChange}

placeholder="Phone"

className="border p-3 rounded-lg"

/>





<input

name="department"

value={employee.department}

onChange={handleChange}

placeholder="Department"

className="border p-3 rounded-lg"

/>





<input

name="designation"

value={employee.designation}

onChange={handleChange}

placeholder="Designation"

className="border p-3 rounded-lg"

/>





<input

type="number"

name="salary"

value={employee.salary}

onChange={handleChange}

placeholder="Salary"

className="border p-3 rounded-lg"

/>





<input

type="date"

name="joiningDate"

value={employee.joiningDate}

onChange={handleChange}

className="border p-3 rounded-lg"

/>





<select

name="status"

value={employee.status}

onChange={handleChange}

className="border p-3 rounded-lg"

>


<option value="Active">
Active
</option>


<option value="Inactive">
Inactive
</option>


</select>





<button

type="submit"

className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg md:col-span-2 font-semibold transition"

>

Update Employee

</button>




</form>


</div>


</div>

);

}