import api from "./api";


export const getActivities=()=>{

return api.get(
"/activity"
);

};