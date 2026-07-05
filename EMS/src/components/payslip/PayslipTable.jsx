import { format } from "date-fns";
import { Download } from "lucide-react";
const PayslipTable = ({ isAdmin, payslips }) => {
  function handleDownloadPayslip(e, payslip) {
    window.open(`print/payslip/${payslip._id || payslip.id}`);
  }

  return (
    <div className=" overflow-hidden card">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>{isAdmin && <th>Employee</th>}
            <th>Period</th>
            <th>Basic Salary</th>
            <th>Net Salary</th>
            <th className="text-center">Action</th></tr>
          </thead>
          <tbody className="text-slate-500 font-medium text-sm">
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4}>No Payslip Found </td>
              </tr>
            ) : (
              payslips.map((payslip) => (
                <tr key={payslip.id}>
                  {isAdmin && (
                    <td>
                      
                      {payslip?.employee.firstName} {payslip?.employee.lastName}
                    </td>
                  )}
                  <td>
                    {format(
                      new Date(payslip?.year, payslip?.month - 1),
                      "MMM yyyy",
                    )}
                  </td>
                  <td> $ {payslip?.basicSalary.toLocaleString()}</td>
                  <td> $ {payslip?.netSalary.toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      onClick={(e) => handleDownloadPayslip(e, payslip)}
                      className="cursor-pointer inline-flex items-center justify-center   text-blue-600 bg-blue-50 rounded-sm px-3 py-1.5  hover:bg-blue-100  duration-200 transition-colors ring-1 ring-blue-500/10"
                    >
                      <Download className="h-3 w-3 text-sm mr-1" />{" "}
                      <span className="text-xs  ">Download</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipTable;
