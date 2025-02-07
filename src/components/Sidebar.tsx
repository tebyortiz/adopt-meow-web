import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Button as NextUIButton } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { useState } from "react";

const menuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [selectedSection, setSelectedSection] = useState("postular"); // Estado inicial

  const handleLogout = async () => {
    await logout();
    navigate("/Login");
  };

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        className="h-[95vh] w-full flex flex-col backdrop-blur-xl rounded-3xl shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        style={{
          background:
            "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
        }}
      >
        <div className="my-4 mx-4 mb-48 p-4 flex flex-col justify-center">
          <div className="flex md:flex-row items-center justify-center mt-4 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              <Avatar
                src="/adopt1.png"
                size="lg"
                className="shadow-[0_0_10px_rgba(255,255,255,0.9)] w-12 h-auto p-1 md:h-12 md:w-auto md:p-2 object-cover"
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
          <Divider className="my-4 bg-white opacity-80 h-[1px]" />
        </div>

        {/* Secciones del Sidebar */}
        <div className="h-auto space-y-4">
          {/* Sección "Postular" */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            animate={
              selectedSection === "postular"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.5, scale: 1 }
            }
            className={`flex flex-row items-center p-2 rounded-2xl px-2 mx-4 cursor-pointer transition-all duration-300 ${
              selectedSection === "postular"
                ? "bg-white bg-opacity-10"
                : "hover:bg-white hover:bg-opacity-5"
            }`}
            onClick={() => {
              setSelectedSection("postular");
              navigate("/OwnerMain");
            }}
          >
            <img
              src="/orange-cat.png"
              alt="Postular"
              className="h-12 w-auto mr-2"
            />
            <p className="text-white font-fredoka text-xl">Postular</p>
          </motion.div>

          {/* Sección "Reportes" */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            animate={
              selectedSection === "reportes"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.5, scale: 1 }
            }
            className={`flex flex-row items-center p-2 rounded-2xl px-2 mx-4 cursor-pointer transition-all duration-300 ${
              selectedSection === "reportes"
                ? "bg-white bg-opacity-10"
                : "hover:bg-white hover:bg-opacity-5"
            }`}
            onClick={() => {
              setSelectedSection("reportes");
              navigate("/OwnerMain");
            }}
          >
            <img
              src="/clipboard.png"
              alt="Reportes"
              className="h-12 w-auto mr-2"
            />
            <p className="text-white font-fredoka text-xl">Reportes</p>
          </motion.div>
        </div>

        {/* Sección del usuario en la parte inferior */}
        {user && (
          <div className="mt-auto mb-4 p-4 flex flex-row items-center bg-white rounded-2xl bg-opacity-10 px-6 mx-4">
            <img
              src={user.image || "/default-avatar.png"}
              alt="User Avatar"
              className="h-12 w-12 rounded-full object-cover shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            />
            <div className="flex flex-col">
              <p className="text-white font-fredoka text-xl ml-3">
                {user.username}
              </p>
              <p className="text-white font-fredoka text-md ml-3">
                {user.email}
              </p>
            </div>
          </div>
        )}

        <NextUIButton
          onPress={handleLogout}
          color="secondary"
          href="#"
          radius="lg"
          className="p-8 px-4 mx-4 mb-4"
          style={{
            background:
              "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
          }}
        >
          <div className="flex items-center justify-center font-fredoka font-semibold text-xl">
            Salir
          </div>
        </NextUIButton>
      </motion.div>
    </div>
  );
};

export default Sidebar;
