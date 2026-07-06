import Employee from "../models/employee.model.js";

/**
 * Get profile
 * GET api/profile
 */
export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    // If the authentcated user is not employee, then it must be admin

    if (!employee)
      return res.status(200).json({
        firstName: "Admin",
        lastName: "",
        email: session.email,
      });
    return res.status(200).json(employee);
  } catch (error) {
    console.log("Get profile error : ", error);

    return res.status(500).json({ error: "Failed to get profile" });
  }
};

/**
 * Update profile
 * PATCH api/profile/update
 */
export const updateProfile = async (req, res) => {
  const { bio } = req.body;
  const session = req.session;

  if (!bio) {
    return res.status(400).json({ error: "Bio field is required." });
  }

  try {
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) return res.status(200).json({ error: "Employee not found" });

    if (employee.isDeleted)
      return res.status(400).json({
        error: "Your account is deactivated, you cannot update your profile",
      });

    employee.bio = bio;

    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Get profile error : ", error);

    return res.status(500).json({ error: "Failed to get profile" });
  }
};
