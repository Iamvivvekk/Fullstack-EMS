import {
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      descriptioin: "Active Workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      descriptioin: "Organisation Units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      descriptioin: "Check in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      descriptioin: "Awaiting approval",
    },
  ];
  stats.map(e=>{console.log(e);
  })
  return (
    <div className="animate-fade-in">
      <div className="page-header"></div>
      <h1 className="page-title"> Dashboard</h1>
      <p className="page-subtitle mb-2">
        Welcome back, Admin - here is your overview
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70" />

              <p className="text-slate-700  text-sm font-semibold">{s.label}</p>

              <p className="text-slate-900 font-bold text-2xl">{s.value}</p>
            </div>

            <s.icon className="size-10 p-2 bg-slate-100 text-slate-600 group-hover:text-indigo-500/70 transition-colors duration-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
