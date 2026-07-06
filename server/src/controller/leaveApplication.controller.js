import LeaveApplication from "../models/leaveApplication.model.js";
import Employee from "../models/employee.model.js";
import getNormalizedDate from "../utils/normalizeDateToMidnight.js";
import { leaveStatus } from "../constants/leaveStatus.js";

/**
 * Create leaves
 * * POST - api/leaves
 */

export const createLeave = async (req, res) => {
  const employee = await Employee.findOne({ userId: session.userId });
  if (!employee) return res.status(400).json({ error: "Employee not found" });

  const { reason, type, startDate, endDate } = req.body;
  const session = req.session;

  if (!reason || !type || !startDate || !endDate)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) return res.status(400).json({ error: "Employee not found" });
    if (employee.isDeleted)
      return res.status(400).json({
        error: "Your account is deactivated, you cannot apply for leave",
      });

    const today = getNormalizedDate(new Date());
    const normalizedStartDate = getNormalizedDate(startDate);
    const normalizedEndDate = getNormalizedDate(endDate);

    if (
      normalizedStartDate <= today ||
      normalizedEndDate < normalizedStartDate
    ) {
      return res.status(400).json({
        error:
          "Leave date must be in future and start date cannot be before end date",
      });
    }

    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      reason,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
    });

    return res.status(201).json({ succes: true, data: leave });
  } catch (error) {
    console.log("Create Leave Error :", error);
    return res
      .status(500)
      .json({ error: "Failed to create leave application" });
  }
};

/**
 * Get leaves
 * * GET - api/leaves
 */

export  const getLeaves = async (req, res) => {
  const session = req.session;
  const isAdmin = session.role === "ADMIN";

  try {
    if (isAdmin) {
      const status = req.query.status;

      const where = status ? { status } : {};

      const leaves = await LeaveApplication.find(where)
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const data = leaves.map((leave) => {
        const obj = leave.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });

      return res.status(200).json({ succes: true, data });
    }
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) return res.status(400).json({ error: "Employee not found" });

    const leaves = await LeaveApplication.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      data: leaves,
      employee: { ...employee, id: employee._id.toString() },
    });
  } catch (error) {
    console.log("Get Leaves Error :", error);
    return res.status(500).json({ error: "Failed to get leaves" });
  }
};

/**
 * Update leave status
 * * PATCH - api/leaves/:id
 */

export const updateLeaveStatus = async (req, res) => {
  const { status } = req.body;

  if (!leaveStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    if (!employee) return res.status(400).json({ error: "Employee not found" });

    const leaves = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );

    return res.status(200).json({ data: leaves });
  } catch (error) {
    console.log("Get Leaves Error :", error);
    return res.status(500).json({ error: "Failed to get leaves" });
  }
};
