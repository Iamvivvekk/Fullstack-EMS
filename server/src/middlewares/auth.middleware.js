import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "Unauthorized, access denied" });
    }

    const token = authHeader.split("")[0];

    const session = await Fjwt.verify(token, process.env.AUTH_SECRET_KEY);

    if (!session)
      return res.status(401).json({ error: "Unauthorized, access denied" });

    req.session = session;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, access denied" });
  }
};

export const protectAdmin = async (req, res, next) => {
  if (req?.session?.role !== "ADMIN")
    return res.status(401).json({ error: "Admin access required" });
  next();
};
