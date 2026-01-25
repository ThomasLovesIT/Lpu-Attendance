const StrangerTitle = ({ type }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">
        ATTENDANCE<span className="text-red-400">.</span>PORTAL
      </h1>
      <div className="h-px w-24 mx-auto bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-2"></div>
      <p className="text-gray-400 text-sm font-mono">
        CS/IT DEPARTMENT • {type === "IN" ? "ENTRY" : "EXIT"} VERIFICATION
      </p>
    </div>
  );
};

export default StrangerTitle;