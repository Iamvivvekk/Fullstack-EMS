import React from "react";
import {
  AlertCircleIcon,
  Calendar,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";
import { dummyAttendanceData } from "../../assets/assets";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (r) => r.status === "PRESENT" || r.status === "LATE",
  ).length;
  const totalLate = history.filter((r) => r.status === "LATE").length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: CalendarIcon,
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon,
    },
    {
      label: "Avg. Working Hrs.",
      value: "8.2 Hrs",
      icon: ClockIcon,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mb-3 mt-5 gap-5 sm:gap-6">
      {stats.map((d) => (
        <div key={d.label} className="card card-hover flex items-center justify-baseline gap-5 relative px-3 py-6 group ">
          <div className="absolute rounded-l-2xl bg-slate-400 w-1 top-0 bottom-0 left-0 my-0.5 group-hover:bg-indigo-500/70 transition-colors duration-200" />
          {/* icon */}
          <d.icon className="size-10 p-2  rounded-md bg-slate-100 group-hover:text-indigo-500/70 transition-colors duration-200" />
          <div className="flex flex-col items-baseline justify-center">
            <p className="text-slate-700  text-sm font-semibold">{d.label}</p>
            <p className="text-slate-900 font-bold text-2xl">{d.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
