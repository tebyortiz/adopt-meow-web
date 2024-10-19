import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0">
        {/* Background image with blur */}
        <div className="absolute inset-0 bg-[url('/bg-landing-page2.jpg')] bg-no-repeat bg-cover md:bg-center bg-[left_bottom_56px] filter blur-sm scale-110"></div>
        {/* Opacity overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/100"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 h-full overflow-y-scroll scrollbar-hide">
        {children}
      </div>
      <div className="fixed bottom-0 inset-x-0 md:h-32 h-24 bg-gradient-to-t from-black to-transparent z-20"></div>
    </div>
  );
};

export default Layout;
