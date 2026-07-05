import React, { useState, useCallback, useEffect } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { PlusIcon, SearchIcon, UserStarIcon, X } from "lucide-react";
import Loader from "./../components/common/Loader";
import EmployeeCard from "./../components/employee/EmployeeCard";
import EmployeeForm from "../components/employee/EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(() => {
    setIsLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : emp,
      ),
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  function handleOnChange() {
    setSearch(e.target.value);
  }

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="animate-fade-in">
      {/* HEADER */}
      <div className="flex  flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="page-subtitle">Manage your team</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary text-center flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <PlusIcon size={16} /> Add Employees
        </button>
      </div>
      {/* SEARCH BAR */}
      <div className="flex justify-between items-center text-center gap-3">
        <div className="flex flex-1 relative justify-between items-center border border-slate-200 mx-2 py-0 rounded-md text-sm text-slate-600">
          <SearchIcon size={16} className="text-slate-500 ml-2" />
          <input
            type="text"
            placeholder="SEARCH EMPLOYEES..."
            onChange={handleOnChange}
            className="border-none outline-none focus:ring-0"
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="btn-secondary cursor-pointer w-auto  focus:ring-0 outline-none"
        >
          <option value="" key="">
            All Departments
          </option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName} className="max-w-40">
              {deptName}
            </option>
          ))}
        </select>
      </div>
      {/* Employee Card */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 ">
          {filtered.length === 0
            ? "No Employess found"
            : filtered.map((e) => (
                <EmployeeCard
                  key={e._id || e.id}
                  employee={e}
                  onDelete={fetchEmployees}
                  onEdit={(e) => setEditEmployee(e)}
                />
              ))}
        </div>
      )}
      {/* showCreateModal  */}
      {showCreateModal && (
        <div className=" fixed bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 inset-0 overflow-y-auto p-4 ">
          <div className="fixed inset-0" />

          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl px-5 py-3  my-8  animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pt-6 ">
              <div className="flex flex-col justify-center">
                <h2 className="overlay-title">Add New Employee</h2>
                <p className="text-sm font-medium text-slate-500 ">
                  Create a user account and employee profile
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-shadow-slate-600">
                <X
                  size={18}
                  onClick={() => setShowCreateModal(false)}
                  className="w-5 h-5"
                />
              </button>
            </div>

            <div className="p-3"></div>
            {/* form starts here */}
            <EmployeeForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
