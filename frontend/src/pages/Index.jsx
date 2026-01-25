import { useState } from "react";
import AttendanceCard from "../components/AttendanceCard";
import GuestFormModal from "../components/GuestFormModal";
import { Calendar, Clock, MapPin } from "lucide-react";

const Index = ({ type }) => {
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [studentId, setStudentId] = useState("");

  // Only show guest link for Time In
  const showGuestLink = type === "IN";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center p-4">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9d22_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d22_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Event Header - KEEP THIS */}
        <div className="mb-12 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-red-900/20 to-blue-900/20 border border-red-500/30 rounded-full mb-6">
            <span className="text-sm font-mono text-red-300">CHAPTER 1: THE VANISHING OF</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent">
              SYSTEM INTEGRATION
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-300 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>01.29.2026</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>JPL BUILDING</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>12:30PM FLT THEATER</span>
            </div>
          </div>
        </div>

        {/* Single Attendance Card Panel - NO INFO PANEL */}
        <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-8">
          {/* Simple Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-300 to-blue-300 bg-clip-text text-transparent">
              INFORMATION ASSURANCE AND SECURITY
            </h2>
            <p className="text-gray-400 text-sm">
              {type === "IN" 
                ? "CS/IT Department Portal" 
                : "Attendance System"}
            </p>
          </div>

          {/* Attendance Card */}
          <AttendanceCard 
            type={type}
            onStudentIdChange={setStudentId}
            onGuestRegistrationRequest={() => setShowGuestForm(true)}
            showGuestLink={showGuestLink}
          />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <p className="text-center text-xs text-gray-600">
              LPU • SYSTEM INTEGRATION LAB • CHAPTER 1
            </p>
          </div>
        </div>
      </div>

      {/* Guest Form Modal - Only show for Time In */}
      {showGuestForm && type === "IN" && (
        <GuestFormModal 
          studentId={studentId}
          type={type}
          onClose={() => setShowGuestForm(false)}
        />
      )}
    </div>
  );
};

export default Index;