import api from "./api";

export const getReports = () => {
  return api.get("/reports");
};