import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loader from "../components/common/Loader";
import { format } from "date-fns";

const PrintPayslip = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    setPayslip(
      dummyPayslipData.find((slip) => slip._id === id || slip.id === id),
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  if (!payslip)
    return (
      <div className="text-center mx-auto ">No Payslip with the id : {id}</div>
    );

  const payslipMonthYear = new Date(payslip.year, payslip.month - 1);
  return (
    <div className=" max-w-xl mx-auto bg-white ">
      <div className=" border-b border-slate-200 text-center py-3 mb-3">
        <h2 className="text-2xl text-slate-900">PAYSLIP</h2>
        <p className="text-sm  text-slate-400">
          {format(payslipMonthYear, "MMMM yyyy")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-9 mt-5">
        <div>
          <h3 className="text-xs text-slate-400 tracking-wider uppercase">
            EMPLOYEE NAME
          </h3>
          <p className="text-md text-slate-900  font-semibold ">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>
        <div>
          <h3 className="text-xs text-slate-400 uppercase">position</h3>
          <p className="text-md text-slate-900  font-semibold ">
            {payslip.employee?.position}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-9 mt-5">
        <div>
          <h3 className="text-xs text-slate-400 tracking-wider uppercase">
            email
          </h3>
          <p className="text-md text-slate-900  font-semibold ">
            {payslip.employee?.email}
          </p>
        </div>
        <div>
          <h3 className="text-xs text-slate-400 tracking-wider uppercase">
            period
          </h3>
          <p className="text-md text-slate-900  font-semibold ">
            {format(payslipMonthYear, "MMMM yyyy")}
          </p>
        </div>
      </div>
      <div className="border border-slate-300 rounded-xl overflow-hidden mb-8 mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-500 uppercase">
              <th className="px-4 py-3 tracking-wider text-xs">Description</th>
              <th className="px-4 py-3 tracking-wider text-xs text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="px-4 py-3 tracking-wider ">Basic Salary</td>
              <td className="text-right text-slate-700 px-4 py-3 font-medium">
                $ {payslip.basicSalary.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 tracking-wider ">Allowances</td>
              <td className="text-right text-slate-700 px-4 py-3 font-medium">
                +$ {payslip.allowances.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 tracking-wider ">Deductions</td>
              <td className="text-right text-slate-700 px-4 py-3 font-medium">
                -$ {payslip.deductions.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t  border-slate-200 bg-slate-100">
              <td className="px-4 py-3 tracking-wider font-semibold">
                Net Salary
              </td>
              <td className="text-right text-slate-700 px-4 py-3 font-semibold">
                $ {payslip.netSalary.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => window.print()}
          className="btn-primary print:hidden"
        >
          Print Payslip
        </button>
      </div>
    </div>
  );
};

export default PrintPayslip;
