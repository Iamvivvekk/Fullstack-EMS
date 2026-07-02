import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Attendence from "./pages/Attendence";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import Payslip from "./pages/Payslip";
import PrintPayslip from "./pages/PrintPayslip";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />

        <Route
          path="/login/admin"
          element={
            <LoginForm
              role="Admin"
              title="Admin Portal"
              subTitle="Sign in to manage Organisation"
            />
          }
        />
        <Route
          path="/login/employee"
          element={
            <LoginForm
              role="Employee"
              title="Employee"
              subTitle="Sign in to access your account"
            />
          }
        />
        <Route element={<Layout />}>
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslip" element={<Payslip />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/payslip/print/:id" element={<PrintPayslip />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
