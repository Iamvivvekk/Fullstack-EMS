import { useEffect, useState } from "react";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets";
import Loader from "../components/Loader";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);


  console.log(data);
  

  if (loading) return <Loader />;

  if (!data) return <p>No data to show</p>;

  

  if (data.role === "ADMIN") return <AdminDashboard data={data} />;

  return <EmployeeDashboard data={data} />;
};

export default Dashboard;
