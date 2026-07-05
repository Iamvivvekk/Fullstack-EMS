import { Loader2, Lock, Save, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData } from "../assets/assets";
import Loader from "../components/common/Loader";
import EditPasswordForm from "../components/settings/EditPasswordForm";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  const [showEditPasswordOverlay, setShowEditPasswordOverlay] = useState(false);

  const [employee, setEmployee] = useState(null);

  const setEmployeeData = useCallback(() => {
    setEmployee(dummyEmployeeData[2]);
  }, [setEmployee]);

  useEffect(() => {
    setEmployeeData();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [employee]);

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h3 className="page-title">Settings</h3>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>
      {/* Personal profile */}
      <form action="">
        <div className="card p-5">
          <h3 className="flex gap-2 items-center justify-baseline  text-base text-black font-normal mb-2 ">
            <User className="h-5 w-5 text-slate-400" />
            Public Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-slate-400 text-sm block my-2">Name</label>
              <input
                type="text"
                defaultValue={`${employee?.firstName} ${employee?.lastName}`}
                disabled={employee ? true : false}
                className={`${employee && "cursor-not-allowed"}`}
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm block my-2">Email</label>
              <input
                type="text"
                defaultValue={employee?.email}
                disabled={employee ? true : false}
                className={`${employee && "cursor-not-allowed"}`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="text-slate-400 text-sm block my-2">
                Position
              </label>
              <input
                type="text"
                defaultValue={employee?.position}
                disabled={employee ? true : false}
                className={`${employee && "cursor-not-allowed"}`}
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm block my-2">Bio</label>
            <textarea
              name="bio"
              placeholder="Write a brief bio"
              defaultValue={employee?.bio}
              className="resize-none text-sm text-slate-700 "
            />
            <p className="text-xs pt-2 text-slate-400">
              *This will be displayed on your profile
            </p>
          </div>
          {employee.isDeleted ? (
            <div className="pt-2">
              <div className="bg-rose-50 border border-rose-200 rounded-md p-4 text-center">
                <p className="text-rose-600 font-medium tracking-tight">
                  Account Deactivated
                </p>
                <p className="text-sm text-rose-500 mt-0.5">
                  You can no longer update your profile
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <button
                disabled={loading}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn-primary flex gap-2 items-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 " />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
      {/* update password button  */}
      <div className="card max-w-md mt-5 p-6 flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-slate-100 rounded-md">
            <Lock className="w-5 h-5 m-2" />
          </div>
          <div>
            <h3 className="text-md text-black/70 font-semibold">Password</h3>
            <p className="text-sm text-slate-500">
              Update your account password
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowEditPasswordOverlay(true)}
          className="btn-secondary cursor-pointer"
        >
          Change
        </button>
      </div>

      <EditPasswordForm
        onClose={() => setShowEditPasswordOverlay(false)}
        showEditPasswordOverlay={showEditPasswordOverlay}
      />
    </div>
  );
};

export default Settings;
