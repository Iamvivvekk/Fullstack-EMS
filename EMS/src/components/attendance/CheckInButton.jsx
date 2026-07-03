import { LogOutIcon } from "lucide-react";

const CheckInButton = () => {
  const handleCheckIn = () => {
    console.log("clicked check in");
    
  };
  return (
    <div
      onClick={handleCheckIn}
      className="fixed right-10 bottom-5 flex justify-between items-center gap-2 bg-indigo-600 rounded-md p-2 group cursor-pointer hover:bg-indigo-700 transition-colors duration-200 border border-indigo-800"
    >
      <LogOutIcon className="size-6 text-white font-semibold" />
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg font-semibold text-white">Check In</p>
        <p className="text-sm font-normal text-white">start your work day</p>
      </div>
    </div>
  );
};

export default CheckInButton;
