import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound(){

const navigate = useNavigate();


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<div className="bg-white shadow-xl rounded-xl p-10 text-center">


<FaExclamationTriangle 
className="text-6xl text-yellow-500 mx-auto mb-5"
/>


<h1 className="text-7xl font-bold text-gray-800">
404
</h1>


<h2 className="text-2xl font-bold mt-4">
Page Not Found
</h2>


<p className="text-gray-500 mt-3">
The page you are looking for does not exist.
</p>



<button

onClick={()=>navigate("/dashboard")}

className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"

>

Go To Dashboard

</button>



</div>


</div>

)

}