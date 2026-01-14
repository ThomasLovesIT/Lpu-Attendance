
import StrangerTitle from "../components/StrangerTitle"; // Ensure relative path
import AttendanceCard from "../components/AttendanceCard";

// 👇 Accept type here
const Index = ({ type }) => {
  return (
    <div className="min-h-screen fog-bg flex flex-col items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden">
      {/* ... ambient lights ... */}

      <div className="relative z-10 w-full max-w-lg">
  

        {/* 👇 PASS THE TYPE PROP HERE */}
        <StrangerTitle type={type} />

        <AttendanceCard type={type} />
      </div>

      {/* ... bottom decoration ... */}
    </div>
  );
};

export default Index;