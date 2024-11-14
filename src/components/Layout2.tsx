import { Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";

const Layout2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0">
        {/* Background image with blur */}
        <div className="absolute inset-0 bg-[url('/bg-landing-page2.jpg')] bg-no-repeat bg-cover md:bg-center bg-[left_bottom_56px] filter blur-sm scale-110"></div>
        {/* Opacity overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/60"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 h-full overflow-y-scroll scrollbar-hide">
        <div className="flex md:flex-row justify-start md:mt-4 md:ml-4 items-center md:mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            <Avatar
              src="/adopt1.png"
              size="lg"
              className="shadow-[0_0_10px_rgba(255,255,255,0.9)] w-12 h-auto p-1 md:h-14 md:w-auto md:p-2 object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, staggerChildren: 0.1 }}
            className="md:ml-2 ml-2 text-inherit text-white md:text-4xl text-xl font-semi-bold font-fredoka"
          >
            AdoptMeow
          </motion.p>
        </div>
        {children}
      </div>
      <div className="fixed bottom-0 inset-x-0 md:h-12 h-8 bg-gradient-to-t from-black to-transparent z-20 opacity-40"></div>
    </div>
  );
};

export default Layout2;
