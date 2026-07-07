import api from "./api";

// Dashboard Statistics
export const getDashboardStats = () => {
  return api.get("/employees/stats");
};

// Get All Employees
export const getEmployees = () => {
  return api.get("/employees");
};

// Get Employee By Id
export const getEmployeeById = (id) => {
  return api.get(`/employees/${id}`);
};

// Add Employee
export const addEmployee = (employee) => {
  return api.post("/employees", employee);
};



// Update Employee
export const updateEmployee = (id, employee) => {
  return api.put(`/employees/${id}`, employee);
};

// Delete Employee
export const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};