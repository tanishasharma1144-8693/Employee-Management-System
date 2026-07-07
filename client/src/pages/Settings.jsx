import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaMoon,
  FaShieldAlt,
} from "react-icons/fa";

export default function Settings() {

  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id:"profile",
      name:"Profile",
      icon:<FaUser/>
    },
    {
      id:"password",
      name:"Password",
      icon:<FaLock/>
    },
    {
      id:"notifications",
      name:"Notifications",
      icon:<FaBell/>
    },
    {
      id:"appearance",
      name:"Appearance",
      icon:<FaMoon/>
    },
    {
      id:"security",
      name:"Security",
      icon:<FaShieldAlt/>
    }
  ];


  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>


      <div className="grid md:grid-cols-4 gap-6">


        {/* Sidebar */}

        <div className="bg-white rounded-xl shadow p-4">

          {
            tabs.map(tab=>(

              <button
                key={tab.id}
                onClick={()=>setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full p-4 rounded-lg mb-2
                ${
                  activeTab===tab.id
                  ?"bg-blue-600 text-white"
                  :"hover:bg-gray-100"
                }`}
              >

                {tab.icon}

                {tab.name}

              </button>

            ))
          }

        </div>



        {/* Content */}

        <div className="md:col-span-3 bg-white rounded-xl shadow p-8">


          {
            activeTab==="profile" &&
            <Profile/>
          }


          {
            activeTab==="password" &&
            <Password/>
          }


          {
            activeTab==="notifications" &&
            <Notifications/>
          }


          {
            activeTab==="appearance" &&
            <Appearance/>
          }


          {
            activeTab==="security" &&
            <Security/>
          }


        </div>


      </div>


    </div>

  );
}






function Profile(){

return (

<div>

<h2 className="text-2xl font-bold mb-6">
Profile Information
</h2>


<div className="grid md:grid-cols-2 gap-5">


<input
className="border p-3 rounded-lg"
placeholder="Full Name"
/>


<input
className="border p-3 rounded-lg"
placeholder="Email"
/>


<input
className="border p-3 rounded-lg"
placeholder="Phone"
/>


<input
className="border p-3 rounded-lg"
placeholder="Department"
/>


</div>


<button
className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
>
Save Changes
</button>


</div>

)

}





function Password(){

return (

<div>

<h2 className="text-2xl font-bold mb-6">
Change Password
</h2>


<input
type="password"
placeholder="Current Password"
className="border p-3 rounded-lg w-full mb-4"
/>


<input
type="password"
placeholder="New Password"
className="border p-3 rounded-lg w-full mb-4"
/>


<input
type="password"
placeholder="Confirm Password"
className="border p-3 rounded-lg w-full mb-4"
/>


<button
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
Update Password
</button>


</div>

)

}





function Notifications(){

const [email,setEmail]=useState(true);
const [alerts,setAlerts]=useState(true);


return (

<div>


<h2 className="text-2xl font-bold mb-6">
Notification Preferences
</h2>



<div className="flex justify-between border-b p-4">

<span>
Email Notifications
</span>


<input
type="checkbox"
checked={email}
onChange={()=>setEmail(!email)}
/>


</div>



<div className="flex justify-between border-b p-4">

<span>
System Alerts
</span>


<input
type="checkbox"
checked={alerts}
onChange={()=>setAlerts(!alerts)}
/>


</div>


</div>

)

}







function Appearance(){

const [dark,setDark]=useState(false);


return (

<div>

<h2 className="text-2xl font-bold mb-6">
Appearance
</h2>


<div className="flex justify-between p-4 border">

<span>
Dark Mode
</span>


<input
type="checkbox"
checked={dark}
onChange={()=>setDark(!dark)}
/>


</div>


</div>

)

}








function Security(){

return (

<div>


<h2 className="text-2xl font-bold mb-6">
Security Settings
</h2>


<div className="bg-green-50 p-5 rounded-lg">


<h3 className="font-bold text-lg">
Account Protection
</h3>


<p className="text-gray-600 mt-2">
Two factor authentication and login monitoring
</p>


<button
className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
>
Enable 2FA
</button>


</div>


</div>

)

}