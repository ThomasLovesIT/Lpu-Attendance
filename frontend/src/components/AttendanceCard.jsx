import { useEffect, useState, useRef } from "react";
import { Clock, LogOut, ExternalLink } from "lucide-react";
import { useTimein, useTimeout } from "../hooks/useAttendance";
import GuestFormModal from "./GuestFormModal";


const AttendanceCard = ({ type = "IN", onStudentIdChange, showGuestLink = true }) => {
  const timeInHook = useTimein();
  const timeOutHook = useTimeout();
  const currentHook = type === "IN" ? timeInHook : timeOutHook;

  const { 
    timein, 
    timeout, 
    isLoading, 
    message, 
    studentId, 
    setStudentId
  } = currentHook;

  const [visibleMessage, setVisibleMessage] = useState({ text: "", type: "" });
  const [showGuestModal, setShowGuestModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (message.text) {
      setVisibleMessage(message);
    }
  }, [message]);

  useEffect(() => {
    if (!isLoading && !showGuestModal) inputRef.current?.focus();
  }, [isLoading, showGuestModal]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Only allow digits and hyphens
    const cleaned = value.replace(/[^\d-]/g, '');
    
    // Limit to 10 characters
    const limited = cleaned.slice(0, 10);
    
    setStudentId(limited);
    onStudentIdChange?.(limited);
  };

  const handleSubmit = async () => {
    if (studentId.length !== 10) return;
    type === "IN" ? await timein(studentId) : await timeout(studentId);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleGuestSuccess = () => {
    setVisibleMessage({ 
      text: "Guest Successfully Registered & Timed In!", 
      type: "success" 
    });
    
    setTimeout(() => {
        setVisibleMessage({ text: "", type: "" });
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* ID Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300 text-center">Student ID</label>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="2024-12345"
          value={studentId}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          maxLength={10}
          className="w-full p-4 bg-black/50 border border-gray-700 rounded-lg text-white font-mono text-center text-lg focus:border-neon-red focus:outline-none"
          autoComplete="off"
          autoFocus
        />
        <p className="text-xs text-gray-500 text-center">Format: ####-##### (numbers and hyphen only)</p>
      </div>

      {/* Main Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || studentId.length !== 10}
        className={`w-full p-4 rounded-lg font-semibold text-white transition disabled:opacity-50 text-lg ${
          type === "IN" 
            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600" 
            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            {type === "IN" ? <Clock className="w-6 h-6" /> : <LogOut className="w-6 h-6" />}
            <span>Time {type}</span>
          </div>
        )}
      </button>

      {/* Status Message */}
      {visibleMessage.text && (
        <p className={`text-center text-sm font-bold ${visibleMessage.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {visibleMessage.text}
        </p>
      )}
      
      {/* Guest Link */}
      {showGuestLink && (
        <div className="text-center py-2">
          <button
            onClick={() => setShowGuestModal(true)}
            className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors hover:underline"
          >
            <span>Not from CS/IT? Time In here!</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Render Modal Here */}
      {showGuestModal && (
        <GuestFormModal 
            type={type} 
            onClose={() => setShowGuestModal(false)}
            onSuccess={handleGuestSuccess}
        />
      )}
    </div>
  );
};

export default AttendanceCard;