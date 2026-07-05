import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center  h-screen items-center">
      <div className="animate-spin size-8 border-2 border-indigo-600 rounded-full border-t-transparent "></div>
    </div>
  );
};

export default Loader;
