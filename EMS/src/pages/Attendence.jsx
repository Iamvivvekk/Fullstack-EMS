import React, { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "./../assets/assets";
import Loader from "./../components/Loader";
import AttendanceStats from "./../components/attendance/AttendanceStats";
import AttendanceHistory from "./../components/attendance/AttendanceHistory";
import CheckInButton from "./../components/attendance/CheckInButton";

const Attendence = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loader />;

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  const todaysRecord = history.find(
    (record) => new Date(record.date).toDateString() === today.toDateString(),
  );

  console.log(todaysRecord);

  return (
    <div className="animate-fade-in">
      <h3 className="page-title">Attendance</h3>
      <p className="page-subtitle">Track your work hours and daily check-ins</p>

      {/* Attendance stats */}
      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />

      <CheckInButton/>
    </div>
  );
};

export default Attendence;
