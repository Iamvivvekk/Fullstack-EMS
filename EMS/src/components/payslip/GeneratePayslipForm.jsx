import { useState } from "react";
import Loader from "../common/Loader";
import { Loader2, X } from "lucide-react";
import CloseOverlayButton from "../common/CloseOverlayButton";

const GeneratePayslipForm = ({ payslips, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGeneratePayslipSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="fixed bg-black/50 backdrop-blur-2xl inset-0 z-50 flex items-center justify-center ">
      <div
        className=" w-full max-w-3xl bg-white rounded-2xl shadow-2xl px-5 py-3  my-8  animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* form header */}
        <div className="flex justify-between items-baseline ">
          <div className="flex flex-col justify-center">
            <h3 className="overlay-title">Generate Payslip</h3>
            <p className="text-sm font-medium text-slate-500 mb-5">
              Generate payslips for your employees
            </p>
          </div>
          <CloseOverlayButton onClose={onCancel} />
        </div>

        {/* Main Form */}
        <form>
          <div className="flex flex-col mb-2">
            <label className="text-slate-400 text-sm pb-2">Employee</label>
            <select>
              {payslips.map((payslip) => (
                <option key={payslip._id || payslip.id}>
                  {payslip?.employee.firstName} {payslip?.employee.lastName} (
                  {payslip?.employee.position})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 mb-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm pb-2 block">Month</label>
              <select name="month">
                {Array.from({ length: 12 }, (v, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm pb-2 block">Year</label>
              <input
                type="number"
                defaultValue={new Date().getFullYear()}
                className="input-hide-increment"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2 gap-4">
            <div className="col-span-2">
              <label className="text-slate-400 text-sm pb-2 block">
                Basic Salary
              </label>
              <input
                type="number"
                className="input-hide-increment"
                placeholder="5000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mb-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm pb-2 block">
                Allowances
              </label>
              <input
                type="number"
                className="input-hide-increment"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm pb-2 block">
                Deductions
              </label>
              <input
                type="number"
                className="input-hide-increment"
                placeholder="0"
              />
            </div>
          </div>
          {/* buttons */}

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              disabled={isLoading}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleGeneratePayslipSubmit}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? <Loader2 /> : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;
