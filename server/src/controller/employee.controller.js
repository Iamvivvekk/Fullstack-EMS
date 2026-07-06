import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";

/**
 * Get employee
 
 * * GET api/employee/.
 */
export const getEmployee = async (req, res) => {
  const { department } = req.query;

  const where = {};

  if (department) where.department = department;
  try {
    const employee = (await Employee.find(where))
      .toSorted({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employee.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? {
            email: emp.userId.email,
            role: emp.userId.role,
          }
        : null,
    }));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch employees" });
  }
};

/**
 * CREATE EMPLOYEE
 
 * * POST  /api/employee/create
 */
export const createEmployee = async (req, res) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    department,
    position,
    basicSalary,
    allowances,
    deductions,
    joinDate,
    isDeleted,
    employmentStatus,
    bio,
  } = req.body;

  if (!firstName || !lastName || !email || !phone)
    return res.status(400).json({ error: "Missing Required Fields" });
  try {
    const user = await User.create({
      email,
      password,
      role: role || "EMPLOYEE",
    });

    const employee = await Employee.create({
      userId: user._id,
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      position,
      department,
      position,
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      isDeleted,
      employmentStatus,
      bio,
    });
    return res.status(201).json({ success: true, employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.log("Create Employee error :", error);

    return res.status(500).json({ error: "Failed to create employee" });
  }
};

/**
 * UPDATE EMPLOYEE
 
 * * PUT api/employee/:id
 */

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    position,
    department,
    basicSalary,
    allowances,
    deductions,
    employmentStatus,
    bio,
  } = req.body;

  try {
    await Employee.findByIdAndUpdate({
      email,
      password,
      firstName,
      lastName,
      phone,
      position,
      department,
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      employmentStatus: employmentStatus || "ACTIVE",
      bio: bio || "",
    });

    const updateUser = { email };

    if (role) updateUser.role = role;

    if (password) updateUser.password = password;

    await User.findByIdAndUpdate(id, updateUser);

    return res.status(204).json({ success: true });
  } catch (error) {
    console.log("Update ployee error :", error);

    return res.status(500).json({ error: "Failed to update employee" });
  }
};

/**
 * DELETE EMPLOYEE
 
 * * DELETE api/employee/:id
 */

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";
    await employee.save();
    return res.status(204).json({ success: true });
  } catch (error) {
    console.log("Delete Employee error :", error);

    return res.status(500).json({ error: "Failed to create employee" });
  }
};
