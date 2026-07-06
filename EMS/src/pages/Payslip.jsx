import React, { useCallback, useEffect, useState } from "react";
import { dummyPayslipData } from "./../assets/assets";
import Loader from "../components/common/Loader";
import GeneratePayslipButton from "../components/payslip/GeneratePayslipButton";
import PayslipTable from "../components/payslip/PayslipTable";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

const Payslip = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showGeneratePayslip, setShowGeneratePayslip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [payslips, setPayslips] = useState([]);

  const fetchPayslipData = useCallback(() => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslipData();
  }, [fetchPayslipData]);

  if (isLoading) return <Loader />;

  return (
    <div className="animate-fade-in">
      {/* header */}
      <div className="flex justify-between items-center mb-3 ">
        <div className="flex flex-col items-baseline justify-center">
          <h3 className="page-title">Payslips</h3>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and Manage Employees Payslips"
              : "Your Payslip History"}
          </p>
        </div>
        {(
          <GeneratePayslipButton
            isAdmin={isAdmin}
            onClick={() => setShowGeneratePayslip(true)}
          />
        )}
      </div>
      {/* payslip-history */}
      <PayslipTable isAdmin={isAdmin} payslips={payslips} />
      {showGeneratePayslip && (
        <GeneratePayslipForm
          payslips={payslips}
          onCancel={() => setShowGeneratePayslip(false)}
        />
      )}
    </div>
  );
};

export default Payslip;
