import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

const PORT = process.env.PORT || 3002;

connectToDb();

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
}

export default app;
