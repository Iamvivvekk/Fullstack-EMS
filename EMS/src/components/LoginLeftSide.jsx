import React from "react";

const LoginLeftSide = () => {
  return (
    <div className="hidden flex-col justify-center px-12 space-y-2 md:flex w-1/2 bg-indigo-950 relative overflow-hidden border-r border-slate-200">
      <div className="absolute -top-30 -left-30 w-72 h-72 border rounded-full bg-indigo-500/20 blur-2xl"></div>
      <h1 className="text-white text-4xl font-semibold">
        Employee <br />
        Management System
      </h1>
      <p className="text-slate-400 text-lg leading-relaxed max-w-md">
        Streamline your workforce operations, track attendance, manage payroll,
        and empower your team  securely
      </p>
    </div>
  );
};

export default LoginLeftSide;
