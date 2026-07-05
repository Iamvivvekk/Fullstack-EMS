import { Link } from "react-router-dom";
import LoginLeftSide from "../components/login/LoginLeftSide";
import { ShieldIcon, UserIcon, ArrowRightIcon } from "lucide-react";
// import Date from 'react'

const LoginLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description:
        "Manage employees, departments, payroll and system configurations.",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description:
        "View your profile,track attendance,request time off and access payslip",
      icon: UserIcon,
    },
  ];
  return (
    <div className="min-h-screen flex">
      <LoginLeftSide />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screenaaaa ">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          <h2 className="text-2xl mb-4">Welcome Back</h2>
          <p className="text-[14px] text-slate-400 mb-4">
            Select your portal to access your system
          </p>
          {/* portal  */}

          <div className="space-y-4">
            {portalOptions.map((p) => (
              <Link
                to={p.to}
                key={p.to}
                className="group block bg-slate-50 border border-slate-200 rounded p-5 sm:p-6 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 transition-colors  ">
                    {p.title}
                  </h3>
                  <ArrowRightIcon className="w-4 text-slate-500 group-hover:text-indigo-600 duration-200 transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-center md:text-left text-sm text-gray-400 ">
            ©{new Date().getFullYear()} FSDev. All Rights Reserved{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
