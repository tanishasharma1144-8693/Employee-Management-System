import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import "./index.css";

import ThemeProvider from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";



// Load saved theme

try {

  const settings = JSON.parse(
    localStorage.getItem("settings")
  );


  if(settings?.darkMode){

    document.documentElement.classList.add("dark");

  }

}

catch(error){

  console.log(
    "Unable to load theme settings"
  );

}



ReactDOM.createRoot(
document.getElementById("root")
)

.render(

<React.StrictMode>


<BrowserRouter>


<ThemeProvider>


<AuthProvider>


<App />


</AuthProvider>


</ThemeProvider>



<ToastContainer

position="top-right"

autoClose={3000}

theme="colored"

/>



</BrowserRouter>


</React.StrictMode>

);