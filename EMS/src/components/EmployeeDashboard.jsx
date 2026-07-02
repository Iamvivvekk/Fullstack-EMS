import {
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  ArrowRightIcon,
} from "lucide-react";

import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subTitle: "This Month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subTitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip ? `$${data.latestPayslip.netSalary}` : "NA",
      title: "Latest Payslip",
      subTitle: "Most Recent Payout",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header"></div>
      <h1 className="page-title"> Welcome {emp?.firstName}!</h1>
      <p className="page-subtitle mb-2">
        {emp?.position} - {emp?.department || "No Department"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70" />

              <p className="text-slate-700  text-sm font-semibold">
                {card.title}
              </p>

              <p className="text-slate-900 font-bold text-2xl">{card.value}</p>
            </div>

            <card.icon className="size-10 p-2 bg-slate-100 text-slate-600 group-hover:text-indigo-500/70 transition-colors duration-200 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendence"
          className="btn-primary justify-center text-center items-center gap-2 inline-flex "
        >
          Mark attendence <ArrowRightIcon size={16} />
        </Link>

        <Link to="/leave" className="btn-secondary text-center">
          Apply for leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
