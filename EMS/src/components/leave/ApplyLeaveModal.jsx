import { Calendar, File, Thermometer, X } from "lucide-react";

const ApplyLeaveModal = ({ open, onClose }) => {
  // const today = new Date();
  const tomarrow = new Date();
  tomarrow.setDate(new Date().getDate() + 1);

  const minDate = tomarrow.toISOString().split("T")[0];

  return (
    open && (
      <div className=" fixed bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 inset-0 overflow-y-auto p-4 ">
        <div className="fixed inset-0" />

        <div
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl px-5 py-3  my-8  animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-baseline  ">
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Apply For Leave
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-5">
                Submit your leave request for approval
              </p>
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-shadow-slate-600">
              <X size={18} onClick={onClose} className="w-4 h-4" />
            </button>
          </div>

          <form className="p-3 border-2 border-slate-100 rounded-md flex flex-col gap-3">
            <div>
              <label className="flex items-center justify-baseline gap-2 mb-2">
                <File className="h-4 w-4" />
                <p className="text-sm">Leave Type</p>
              </label>
              <select name="">
                <option value="">Sick</option>
                <option value="">Annual</option>
                <option value="">Casual</option>
              </select>
            </div>
            <div>
              <label className="flex items-center justify-baseline gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <p className="text-sm">Duration</p>
              </label>

              <div className="grid grid-cols-2 space-x-5">
                <div>
                  <label>From</label>
                  <input type="date" name="startDate" required min={minDate} />
                </div>
                <div>
                  <label>To</label>
                  <input type="date" name="endDate" required min={minDate} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ApplyLeaveModal;
