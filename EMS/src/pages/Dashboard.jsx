import { useEffect, useState } from "react";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets";
import Loader from "../components/common/Loader";
import EmployeeDashboard from "../components/dashboard/EmployeeDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
 

  if (loading) return <Loader />;

  if (!data) return <p>No data to show</p>;

  

  if (data.role === "ADMIN") return <AdminDashboard data={data} />;

  return <EmployeeDashboard data={data} />;
};

export default Dashboard;
