import { Link } from "react-router-dom";

import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { PlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; 

const NavBar = () => {
  // 1. Grab the user from the Global State
  const { user, dispatch } = useAuthContext();


 
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-primary/20">
      <div className="mx-auto max-w-6xl px-4 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* LOGO */}
          <Link 
            to="/timein" 
            className="text-2xl font-bold text-primary font-mono tracking-tight hover:text-primary-focus transition-colors"
          >
        LPU REGISTRATION
          </Link>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4">
            
            {/* CONDITIONAL RENDERING: Check if user exists */}
            {user ? (
              // 🟢 IF LOGGED IN: Show Create & Logout
              <>
                <span className="text-sm font-semibold hidden md:block">
                  {user.email}
                </span>

                <Link 
                  to="/create" 
                  className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>New Note</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm md:btn-md border border-primary/20 text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              // 🔴 IF LOGGED OUT: Show Login & Register
              <>
                <Link 
                  to="/timein" 
                  className="btn btn-ghost btn-sm md:btn-md text-primary"
                >
                  Time In
                </Link>

                <Link 
                  to="/timeout" 
                  // Kept Register as primary to draw attention (Call to Action)
                  className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  Timeout
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default NavBar;