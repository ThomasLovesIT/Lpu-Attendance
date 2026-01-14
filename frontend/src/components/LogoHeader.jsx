const LogoHeader = ({ logoUrl = "", schoolName = "Your School Name" }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12">
      <div className="logo-container py-4 px-6 md:px-10 flex items-center justify-center gap-4">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={`${schoolName} Logo`}
            className="h-12 md:h-16 w-auto object-contain"
          />
        ) : (
          <div className="h-12 md:h-16 px-6 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <span className="text-muted-foreground/50 text-sm font-medium">
              School Logo
            </span>
          </div>
        )}
        {schoolName && (
          <span className="text-foreground/80 text-lg md:text-xl font-medium hidden md:block">
            {schoolName}
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoHeader;
