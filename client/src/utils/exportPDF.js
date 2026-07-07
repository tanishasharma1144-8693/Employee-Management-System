import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (employees) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Report", 14, 20);

  const tableColumn = [
    "Employee ID",
    "Name",
    "Email",
    "Department",
    "Status",
  ];

  const tableRows = employees.map((emp) => [
    emp.employeeId,
    emp.name,
    emp.email,
    emp.department,
    emp.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save("Employees.pdf");
};