import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Button as NextUIButton,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NextUINavbar
      shouldHideOnScroll
      isBlurred
      className="bg-background/10 w-full h-24"
      maxWidth="full"
    >
      <NavbarBrand>
        <div className="flex items-center md:ml-10  cursor-pointer"
        onClick={() => navigate("/")}>
          <Avatar
            src="/adopt1.png"
            size="lg"
            className="shadow-[0_0_10px_rgba(255,255,255,0.7)] w-12 h-auto p-1 md:h-14 md:w-auto md:p-2 object-cover "
            
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, staggerChildren: 0.1 }}
            className="md:ml-4 ml-2 text-inherit text-white md:text-4xl text-xl font-semi-bold font-fredoka"
            
          >
            AdoptMeow
          </motion.p>
        </div>
      </NavbarBrand>
      <NavbarContent justify="end" className="md:mr-12">
        <NavbarItem>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <NextUIButton
              as={motion.button}
              whileHover={{
                scale: 1.2,
                backgroundColor: "primary",
                boxShadow: "0px 4px 14px rgba(59, 130, 246, 0.5)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              color="primary"
              href="#"
              variant="bordered"
              className="text-white rounded-full font-fredoka"
              onClick={() => navigate("/login")}
            >
              Login
            </NextUIButton>
          </motion.div>
        </NavbarItem>
        <NavbarItem>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <NextUIButton
              as={motion.button}
              whileHover={{
                scale: 1.2,
                backgroundColor: "secondary",
                boxShadow: "0px 4px 14px rgba(245, 0, 87, 0.5)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              color="secondary"
              href="#"
              variant="bordered"
              className="text-white rounded-full font-fredoka"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </NextUIButton>
          </motion.div>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
