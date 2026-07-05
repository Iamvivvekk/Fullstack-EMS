import { X } from "lucide-react";

const CloseOverlayButton = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-shadow-slate-600"
    >
      <X size={18} className="w-4 h-4" />
    </button>
  );
};

export default CloseOverlayButton;
