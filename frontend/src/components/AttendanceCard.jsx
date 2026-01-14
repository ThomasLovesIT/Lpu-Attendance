import { useEffect, useState, useRef } from "react";
import { Clock, LogOut } from "lucide-react"; 
import { useTimein, useTimeout } from "../hooks/useAttendance";

// 👇 1. Import the audio files correctly (Adjust path if needed)
// Since your files are in 'src/', and this component is in 'src/components/', use '../'
import successSound from "../success.mp3";
import errorSound from "../error.mp3";

const AttendanceCard = ({ type = "IN" }) => {
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
  const inputRef = useRef(null);

  // 👇 2. Create the Audio Refs using the imported files
  const successAudio = useRef(new Audio(successSound));
  const errorAudio = useRef(new Audio(errorSound));

  // 👇 3. Adjust volume (optional, usually good to lower it slightly)
  useEffect(() => {
    successAudio.current.volume = 0.5;
    errorAudio.current.volume = 0.5;
  }, []);

  useEffect(() => {
    setVisibleMessage(message);

    if (message.text) {
      // 👇 4. Play Sound Logic
      if (message.type === "success") {
        successAudio.current.currentTime = 0; // Reset sound to start
        successAudio.current.play().catch(e => console.log("Audio play failed", e));
      } else if (message.type === "error") {
        errorAudio.current.currentTime = 0;
        errorAudio.current.play().catch(e => console.log("Audio play failed", e));
      }

      // Hide message after 5 seconds
      const timer = setTimeout(() => {
        setVisibleMessage({ text: "", type: "" });
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [message]); // Runs whenever the hook sends a new message

  // Focus input automatically when loading finishes
  useEffect(() => {
    if (!isLoading) {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 10);
    }
  }, [isLoading]);

    const formatStudentId = (value) => {
    // 1. Allow only numbers (0-9) and the hyphen (-)
    // Regex explanation: Replace anything that is NOT a number or dash with empty string
    const cleaned = value.replace(/[^0-9-]/g, "");
    
    // 2. Strict length limit (10 chars = 4 numbers + 1 dash + 5 numbers)
    return cleaned.slice(0, 10);
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatStudentId(rawValue);
    setStudentId(formattedValue);
  };

  const handleSubmit = async () => {
    if (studentId.length !== 10) return; 

    if (type === "IN") {
      await timein(studentId);
    } else {
      await timeout(studentId);
    }
    
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const isInvalidFormat = studentId.length > 0 && studentId.length < 10;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="neon-box bg-card/80 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-muted/50">
        
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10 pulse-glow">
            {type === "IN" ? (
                <Clock className="w-10 h-10 text-primary" />
            ) : (
                <LogOut className="w-10 h-10 text-primary" />
            )}
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-foreground mb-2 tracking-wide">
          {type === "IN" ? "Student Time In" : "Student Time Out"}
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Enter your ID to record attendance
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="studentId" 
              className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
            >
              Student ID
            </label>
            <input
              ref={inputRef}
              id="studentId"
              type="text"
              placeholder="2023-12345"
              value={studentId} 
              onChange={handleInputChange} 
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              maxLength={10} 
              className={`input-stranger w-full h-14 text-lg text-center font-mono px-4 rounded-xl placeholder:text-muted-foreground/50
                ${isInvalidFormat ? "border-destructive focus:border-destructive text-destructive" : ""}
              `}
              autoComplete="off"
              autoFocus
            />
            {isInvalidFormat && (
                <p className="text-xs text-destructive text-center mt-1">
                    Format must be ####-#####
                </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || studentId.length !== 10} 
            className="btn-stranger w-full h-14 text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
               <span className="animate-pulse">Processing...</span>
            ) : (
               <>
                 {type === "IN" ? <Clock className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                 {type === "IN" ? "Time In" : "Time Out"}
               </>
            )}
          </button>

          <div className="h-8 flex items-center justify-center">
            {visibleMessage.text && (
              <p 
                className={`text-center text-sm font-medium animate-fade-in ${
                  visibleMessage.type === "success" 
                    ? "success-message" 
                    : "text-destructive"
                }`}
              >
                {visibleMessage.text}
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-muted-foreground/60 text-xs mt-6">
        System Active • LPU Registration
      </p>
    </div>
  );
};

export default AttendanceCard;