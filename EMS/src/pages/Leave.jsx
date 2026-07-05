import React, { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loader from "../components/common/Loader";
import LeaveHistory from "../components/leave/LeaveHistory";
import {
  PalmtreeIcon,
  ThermometerIcon,
  UmbrellaIcon,
  PlusIcon,
} from "lucide-react";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");

  const sickLeaves = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualLeaves = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annualLeaves = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  const leaveStats = [
    {
      label: "Sick Leave",
      value: sickLeaves,
      icon: ThermometerIcon,
    },
    {
      label: "Casual Leave",
      value: casualLeaves,
      icon: UmbrellaIcon,
    },
    {
      label: "Annual Leave",
      value: annualLeaves,
      icon: PalmtreeIcon,
    },
  ];

  function handleApplyForLeave() {
    setShowModal(true);
  }

  // Loader
  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      {/* header */}
      <div className="flex  flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ">
        <div>
          <h3 className="page-title">Leave Management</h3>
          <p className="page-subtitle">
            {isAdmin
              ? "Manage Leave Applications"
              : "Your Leave Requests and History"}
          </p>
        </div>
        {/* apply for leave button */}
        {!isAdmin && !isDeleted && (
          <button
            onClick={handleApplyForLeave}
            className="flex btn-primary items-center justify-center gap-3"
          >
            <PlusIcon className="" size={16} />
            <p>Apply for Leave</p>
          </button>
        )}
      </div>

      {/* stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 mb-3 mt-5 gap-5 sm:gap-6 ">
        {leaveStats.map((s) => (
          <div
            key={s.label}
            className="card card-hover bg-slate-100 rounded-lg  group relative flex items-center justify-baseline px-3 py-6 gap-5"
          >
            <div className="absolute rounded-l-full bg-slate-400 w-1 top-0 bottom-0 left-0 my-0.5 group-hover:bg-indigo-500/70 transition-colors duration-200" />
            <s.icon className="size-10 p-2 bg-slate-100 text-slate-600 group-hover:text-indigo-500/70 transition-colors duration-200 rounded-lg" />

            <div>
              <p className="text-slate-700  text-sm font-semibold">{s.label}</p>
              <div className="flex items-center justify-start gap-1">
                <p className="text-slate-900 font-bold text-2xl">{s.value}</p>
                <p className="text-slate-400  text-sm font-normal">taken</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      <ApplyLeaveModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Leave;
