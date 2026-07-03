import React from "react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  return (
    <div className=" group relative card card-hover overflow mt-5 ml-2">
      <div>
        <div className="h-full w-full flex items-center justify-center ">
          {/* circle icon  */}

          <div className="my-12 h-20 w-20 text-center rounded-full p-5 bg-linear-to-r from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-indigo-400 font-semibold text-xl">
              {`${employee.firstName[0]} ${employee.lastName[0]}`}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-3 left-3 rounded shadow-sm  bg-white/90 backdrop-blur-sm px-1">
        <span className="text-xs font-medium text-slate-600">
          {employee.department || "Remote"}
        </span>
        {employee.isDeleted && (
          <span className="text-xs text-red-500/60 font-medium">Deleted</span>
        )}
      </div>
      <div className="p-5 bg-slate-200 rounded-b-md">
        <h3 className="text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-xs text-slate-500 ">{employee.position}</p>
      </div>
      {/* add edit and delete employee icon action button on the employee cards */}
    </div>
  );
};

export default EmployeeCard;
