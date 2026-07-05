import { useState } from "react";
import CloseOverlayButton from "../common/CloseOverlayButton";
import { Loader2 } from "lucide-react";

const EditPasswordForm = ({ onClose, showEditPasswordOverlay }) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleUpdatePassword(e) {
    e.preventDefault();
  }
  return (
    showEditPasswordOverlay && (
      <div className="transition-all duration-200 fixed backdrop-blur-sm inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
        <div className="bg-white p-5 max-w-3xl w-full rounded-2xl">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col items-baseline justify-center">
              <h3 className="overlay-title">Edit Password</h3>
              <p className="overlay-subtitle">Update your password </p>
            </div>
            <CloseOverlayButton onClose={onClose} />
          </div>
          <form className="card p-3 mt-1 text-sm text-slate-400 flex flex-col gap-3">
            <div>
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Enter your current password"
                className="mt-1 text-lg text-slate-700"
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="mt-1 text-lg text-slate-700"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                disabled={isLoading}
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                type="submit"
                onClick={handleUpdatePassword}
                className="btn-primary"
              >
                {isLoading ? <Loader2 /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditPasswordForm;
