import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js";

/**
 * Clock in/out for employee
 * POST /api/attendance
 *
 */
export const clockInOut = async (req, res) => {
  const session = req.session;
  try {
    const employee = await Employee.findById(session.userId);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    if (employee.isDeleted)
      return res
        .status(403)
        .json({ error: "Account is deactivated, you cannot clock in/out" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    const now = new Date();

    if (!existing) {
      // clock in
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;
      const attendance = await Attendance.create({
        employeeId: session.userId,
        date: today,
        clockIn: now,
        status: isLate ? "LATE" : "PRESENT",
      });
      return res
        .status(200)
        .json({ success: true, type: "CHECK_IN", data: attendance });
    } else if (!existing.checkOut) {
      // already clocked-in , now clock out
      existing.clockOut = now;
      const workingHours =
        (existing.clockOut - existing.clockIn) / (1000 * 60 * 60);

      existing.workingHours = parseFloat(workingHours.toFixed(2));

      let dayType = "Full Day";

      if (workingHours >= 8) {
        dayType = "Full Day";
      } else if (workingHours >= 4 && workingHours <= 6) {
        dayType = "Half Day";
      } else if (workingHours >= 6 && workingHours < 8) {
        dayType = "Three Quarter Day";
      } else {
        dayType = "Short Day";
      }

      existing.dayType = dayType;
      await existing.save();
      return res
        .status(200)
        .json({ success: true, type: "CHECK_OUT", data: existing });
    } else {
      return res
        .status(200)
        .json({ success: true, type: "CHECK_OUT", data: existing });
    }
  } catch (error) {
    console.log("Attendance Error : ", error);
    return res.status(500).json({ error: "Failed to clock-in/clock-out" });
  }
};

/**
 * Get attendance for employee
 * get /api/attendance
 *
 */
export const getAttendance = async (req, res) => {
  const session = req.session;
  const limit = req.query.limit || 30;

  try {
    const employee = await Employee.findById(session.userId);
    if (!employee) return res.status(400).json({ error: "Employee not found" });

    const attendance = await Attendance.find({
      employeeId: employee._id,
    })
      .sort({ date: -1 })
      .limit(limit);

    return res.status(200).json({ attendance });
  } catch (error) {
    console.log("Attendance Error : ", error);
    return res.status(500).json({ error: "Failed to get attendance" });
  }
};
