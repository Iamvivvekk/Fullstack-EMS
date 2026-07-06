import { DEPARTMENTS } from "../constants/department.js";
import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Payslip from "../models/payslip.model.js";
import LeaveApplication from "../models/leaveApplication.model.js";
import getNormalizedDate from "../utils/normalizeDateToMidnight.js";
/**
 * Get employee/admin dashboard
 * GET api/dashboard
 */
export const getDashboard = async (req, res) => {
  const session = req.session;
  const isAdmin = session.role === "ADMIN";

  try {
    if (isAdmin) {
      const [totalEmployees, todaysAttendance, pendingLeaves] =
        await Promise.all([
          Employee.countDocuments({ isDeleted: { $ne: true } }),
          Attendance.countDocuments({
            date: {
              $ge: getNormalizedDate(new Date()),
              $lt: new Date(new Date().setHours(24, 0, 0, 0)),
            },
          }),
          LeaveApplication.countDocuments({ status: { $eq: "PENDING" } }),
        ]);

      const data = {
        role: "ADMIN",
        totalDepartments: DEPARTMENTS.length,
        totalEmployees,
        todaysAttendance,
        pendingLeaves,
      };
      return res.json({ success: true, data });
    } else {
      const employee = await Employee.findOne({ userId: session.userId });
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });

      const today = new Date();

      const [daysPresent, pendingLeaves, latestPayslip] = await Promise.all([
        Attendance.countDocuments({
          employeeId: employee._id,
          status: { $eq: "PRESENT" },
          date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          },
        }),

        LeaveApplication.countDocuments({
          employeeId: employee._id,
          status: { $eq: "PENDING" },
        }),
        Payslip.findOne({ employeeId: employee._id })
          .sort({ createdAt: -1 })
          .lean(),
      ]);

      const data = {
        role: "EMPLOYEE",
        daysPresent,
        pendingLeaves,
        latestPayslip: latestPayslip
          ? { ...latestPayslip, id: latestPayslip._id.toString() }
          : null,
      };
      return res.json({ success: true, data });
    }
  } catch (error) {
    console.log("Get Dashboard data Error :", error);
    return res.status(500).json({ error: "Failed to get dashboard stats" });
  }
};
