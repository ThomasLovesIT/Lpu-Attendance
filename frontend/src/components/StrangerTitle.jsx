import React from 'react';

// 👇 Accept the "type" prop
const StrangerTitle = ({ type }) => {
  
  // Define text based on type
  // You can change "TIME IN" to "REGISTRATION" if you prefer
  const topText = type === "OUT" ? "STUDENT" : "STUDENT"; 
  const bottomText = type === "OUT" ? "TIME OUT" : "TIME IN";

  return (
    <div className="text-center mb-8 relative">
      {/* Top Line (Small) */}
      <h3 className="text-neon-blue font-stranger text-2xl md:text-3xl tracking-widest uppercase mb-[-10px] animate-pulse">
        {topText}
      </h3>

      {/* Bottom Line (Big - The Stranger Things Style) */}
      <h1 className="font-stranger text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-neon-red via-primary to-red-900 filter drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
        {/* We map over letters to give them that uneven Stranger Things look if desired, 
            or just render the text directly with the class */}
        <span className="neon-text filter drop-shadow-lg">
          {bottomText}
        </span>
      </h1>
      
      {/* The Red Line Underneath */}
      <div className="h-1 w-3/4 mx-auto mt-2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(255,0,0,1)]" />
    </div>
  );
};

export default StrangerTitle;