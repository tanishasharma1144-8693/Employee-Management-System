import api from "./api";



export const getSalaries=()=>{

return api.get("/salary");

};



export const addSalary=(data)=>{

return api.post(
"/salary",
data
);

};



export const deleteSalary=(id)=>{

return api.delete(
`/salary/${id}`
);

};