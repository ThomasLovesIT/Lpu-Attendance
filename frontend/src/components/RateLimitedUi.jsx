import { TimerIcon, ShieldAlertIcon, RefreshCcwIcon } from "lucide-react";

const RateLimitedUi = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-300/90 backdrop-blur-md">
      <div className="max-w-md w-full p-8 bg-base-100 rounded-3xl border border-primary/20 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <TimerIcon className="size-16 text-primary animate-pulse" />
            <ShieldAlertIcon className="size-6 text-error absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-base-content mb-2">Slow down, Ranger!</h2>
        <p className="text-base-content/70 mb-8 leading-relaxed">
          Our Redis sensors detected too many requests. We've paused your session briefly to keep the forest healthy.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary btn-block gap-2"
          >
            <RefreshCcwIcon className="size-4" />
            Try Again
          </button>
          
          <p className="text-xs text-base-content/40 uppercase tracking-widest font-semibold">
            Typically resets in 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUi;