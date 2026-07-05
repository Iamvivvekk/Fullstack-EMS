import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS } from "../../assets/assets";
import { Loader2Icon, OptionIcon } from "lucide-react";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 max-w-3xl animate-fade-in"
    >
      {/* Personal Info */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium text-slate-600 mb-6 pb-4 border-b border-slate-400">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm mb-2">
          <div>
            <label className="block mb-2">First Name</label>
            <input type="text" placeholder="John" />
          </div>
          <div>
            <label className="block mb-2">Last Name</label>
            <input type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm mb-2 ">
          <div>
            <label className="block mb-2">Phone</label>
            <input
              type="number"
              name="phone"
              defaultValue={initialData?.phone}
              placeholder="9876543210"
              className="input-hide-increment"
            />
          </div>
          <div>
            <label className="block mb-2">Joined From</label>
            <input
              type="date"
              name="join date"
              defaultValue={
                initialData?.joinDate
                  ? initialData?.joinDate.toIsoString().split("T")[0]
                  : ""
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Bio (Optional)</label>
            <textarea
              rows={3}
              name="bio"
              defaultValue={initialData?.bio}
              className="resize-none"
              placeholder="Brief Description"
            />
          </div>
        </div>{" "}
      </div>
      {/* Employment details */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium text-slate-600 mb-6 pb-4 border-b border-slate-400">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-5 text-slate-700">
          <div>
            <label className="block mb-2">Department</label>
            <select
              name="department"
              defaultValue={initialData?.department}
              className="border outline-none focus:ring-0"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Position</label>
            <input
              type="text"
              name="position"
              defaultValue={initialData?.position}
              className="input-hide-increment"
            />
          </div>

          <div>
            <label className="block mb-2">Basic Salary</label>
            <input
              type="number"
              name="position"
              defaultValue={initialData?.basicSalary || 0}
              className="input-hide-increment"
            />
          </div>

          <div>
            <label className="block mb-2">Allowance</label>
            <input
              type="number"
              name="allowance"
              defaultValue={initialData?.allowance || 0}
              className="input-hide-increment"
            />
          </div>
          <div>
            <label className="block mb-2">Deductions</label>
            <input
              type="number"
              name="deductions"
              defaultValue={initialData?.deductions || 0}
              className="input-hide-increment"
            />
          </div>
          {isEditMode && (
            <div>
              <label className="block mb-2">Status</label>
              <select
                name="employmentStatus"
                defaultValue={initialData?.employmentStatus}
                className="border outline-none focus:ring-0"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* Account Setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium text-slate-600 mb-6 pb-4 border-b border-slate-400">
          Account Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-5 text-slate-700">
          <div className="col-span-2">
            <label className="block mb-2">Work Email</label>
            <input type="email" placeholder="jone@example.com" />
          </div>
          <div>
            <label className="block mb-2">Change Password (Optional)</label>
            <input
              type="password"
              name="password"
              placeholder={isEditMode ? "Leave blank to keep current" : ""}
              defaultValue={initialData?.password}
            />
          </div>
          <div>
            <label className="block mb-2">System Role</label>
            <select name="role">
              <option value="admin">Admin</option>
              <option value="employee">Employee </option>
            </select>
          </div>
        </div>
      </div>
      {/* buttons */}

      <div className="flex justify-end gap-3">
        <button
          disabled={loading}
          className="btn-secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="btn-primary flex justify-center items-center"
        >
          {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2" />}
          {isEditMode ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
