import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";


export default function AccessDenied(){

const navigate = useNavigate();


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<div className="bg-white shadow-xl rounded-xl p-10 text-center">


<FaLock
className="text-6xl text-red-500 mx-auto mb-5"
/>


<h1 className="text-5xl font-bold">
403
</h1>


<h2 className="text-2xl font-bold mt-4">
Access Denied
</h2>


<p className="text-gray-500 mt-3">
You don't have permission to access this page.
</p>



<button

onClick={()=>navigate("/dashboard")}

className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"

>

Return Dashboard

</button>


</div>


</div>


)

}