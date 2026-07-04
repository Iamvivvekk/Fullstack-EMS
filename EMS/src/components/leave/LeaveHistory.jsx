import { useState } from "react";
import { format } from "date-fns";
import { Check, PlusIcon, X, Loader2 } from "lucide-react";

const LeaveHistory = ({ leaves, isAdmin }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
  };

  return (
    <div className="card overflow-hidden">
      <div className="  border-b border-slate-100 m-5">
        <h3 className="font-semibold text-slate-900">Leave History</h3>
      </div>
      <div className="overflow-x-hidden">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th className="px-5 pt-3">Type</th>
              <th className="px-5 pt-3">Dates</th>
              <th className="px-5 pt-3">Reason</th>
              <th className="px-5 pt-3">Status</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody className="text-[14px] font-light text-slate-600">
            {leaves.length === 0 ? (
              <tr>
                <td className={isAdmin ? "col-span-6" : "col-span-4"}>
                  No Records found
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => {
                return (
                  <tr key={leave._id || leave.id}>
                    {isAdmin && (
                      <td>
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}

                    <td>
                      <span className="bg-slate-100 p-1 text-[12px] rounded-md">
                        {leave.type}
                      </span>
                    </td>

                    <td>
                      {leave.startDate
                        ? `${format(leave.startDate, "MMM d")} - ${format(leave.endDate, "MMM d, yyyy")}`
                        : "-"}
                    </td>

                    <td className="max-w-xs truncate text-slate-600">
                      {leave.reason}
                    </td>

                    <td className=" text-slate-600">
                      <span
                        className={`badge ${leave.status === "APPROVED" ? "badge-success" : leave.status === "PENDING" ? " badge-warning " : " badge-danger "}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    {isAdmin&& leave.status === "PENDING" && (
                      <td>
                        <div className="flex items-center justify-baseline gap-2 ">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "APPROVED",
                              )
                            }
                            disabled={!!processing}
                            className="p-1.5 rounded-md bg-emerald-50  text-emerald-600 hover:bg-emerald-100 "
                          >
                            {processing === (leave._id || leave.id) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "REJECTED",
                              )
                            }
                            disabled={!!processing}
                            className="p-1.5 rounded-md bg-rose-50  text-rose-600 hover:bg-rose-100 "
                          >
                            {processing === (leave._id || leave.id) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
