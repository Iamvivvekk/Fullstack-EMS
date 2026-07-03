import React from "react";
import { format } from "date-fns";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="card overflow-hidden">
      <div className=" px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="overflow-x-hidden">
        <table className="table-modern">
          <thead>
            <tr>
              <th className="px-5 pt-3">Date</th>
              <th className="px-5 pt-3">Check In</th>
              <th className="px-5 pt-3">Check Out</th>
              <th className="px-5 pt-3">Working Hours</th>
              <th className="px-5 pt-3">Day Type</th>
              <th className="px-5 pt-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td className="col-span-6">No Records found</td>
              </tr>
            ) : (
              history.map((record) => {
                const daytype = getDayTypeDisplay(record);

                return (
                  <tr key={record._id || record.id}>
                    <td className="px-6 py-4 text-slate-600">
                      {record.date ? format(record.date, "MMM d, yyyy") : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkIn ? format(record.checkIn, "hh:mm a") : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkOut
                        ? format(record.checkOut, "hh:mm a")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {getWorkingHoursDisplay(record)}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {record.dayType !== "-" ? (
                        <span className={`badge ${daytype.className}`}>
                          {record.dayType}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {record.dayType !== "-" ? (
                        <span
                          className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? " badge-warning " : " badge-danger "}`}
                        >
                          {record.status}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
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

export default AttendanceHistory;
