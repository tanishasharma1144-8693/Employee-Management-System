import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}