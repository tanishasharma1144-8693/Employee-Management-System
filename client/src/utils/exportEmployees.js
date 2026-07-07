import * as XLSX from "xlsx";

export function exportEmployees(employees) {
  const data = employees.map((emp) => ({
    "Employee ID": emp.employeeId,
    Name: emp.name,
    Email: emp.email,
    Phone: emp.phone,
    Department: emp.department,
    Designation: emp.designation,
    Salary: emp.salary,
    Status: emp.status,
    "Joining Date": new Date(emp.joiningDate).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  XLSX.writeFile(workbook, "Employees.xlsx");
}