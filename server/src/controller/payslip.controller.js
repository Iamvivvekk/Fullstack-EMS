import Payslip from "../models/payslip.model.js";

/**
 * Create payslip
 *
 * * POST - /api/payslip
 */
export const createPayslip = async (req, res) => {
  const {
    employeeId,
    date,
    month,
    basicSalary,
    allowances,
    deductions,
    netSalary,
  } = req.body;

  if (!employeeId || !date || !month || !basicSalary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const netSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const payslip = await Payslip.create({
      employeeId,
      date: Number(date),
      month: Number(month),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    });

    return res.status(201).json({ success: true, data: payslip });
  } catch (error) {
    console.log("Create Payslip error :", error);

    return res.status(500).json({ error: "Failed to generate payslip" });
  }
};

/**
 * Get payslips
 *
 * * GET - /api/payslips
 */
export const getPayslips = async (req, res) => {
  const session = req.session;
  const limit = req.query.limit || 30;
  const isAdmin = req.role === "ADMIN";
  try {
    if (isAdmin) {
      const payslips = await Payslip.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("employeeId");

      const data = payslips.map((payslip) => {
        const obj = payslip.toObject();
        return {
          ...obj,
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });

      return res.status(200).json({ success: true, data });
    }

    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    const payslips = await Payslip.find({ employeeId: employee._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ data: payslips });
  } catch (error) {
    console.log("Get Payslips error :", error);

    return res.status(500).json({ error: "Failed to get payslips" });
  }
};

/**
 * Get payslips by id
 *
 * * GET - /api/payslips/:id
 */
export const getPayslipById = async (req, res) => {
  const session = req.session;
  const id = req.params.id;
  const isAdmin = req.role === "ADMIN";
  try {
    const payslip = await Payslip.findById(id).populate("employeeId").lean();

    if (!payslip) return res.status(404).json({ error: "Payslip not found" });

    const data = {
      ...payslip,
      id: payslip.employeeId._id.toString(),
      employee: payslip.employeeId,
    };

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Get Payslips by Id error :", error);

    return res.status(500).json({ error: "Failed to get payslip" });
  }
};
