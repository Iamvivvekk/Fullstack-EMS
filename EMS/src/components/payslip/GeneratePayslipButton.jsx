import { Plus, X } from "lucide-react";

const GeneratePayslipButton = ({ isAdmin, onClick }) => {
  return (
    isAdmin && (
      <button
        onClick={onClick}
        className="flex items-center justify-center btn-primary gap-2"
      >
        <Plus className="h-4 w-4" /> Generate Payslip
      </button>
    )
  );
};

export default GeneratePayslipButton;
