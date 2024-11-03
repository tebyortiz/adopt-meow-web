import Icon from "@mdi/react";
import {
  mdiEmail,
  mdiKey,
  mdiEye,
  mdiEyeOff,
  mdiAccountHeartOutline,
} from "@mdi/js";
import { motion } from "framer-motion";
import { Card, Input, Button as NextUIButton } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.4,
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const Register = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto p-0 m-auto md:mt-4 mt-4">
        {/* TÍTULO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          variants={cardVariant}
          className="flex flex-col md:flex-row items-center justify-center w-full mt-12"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={cardVariant}
            className="flex flex-col items-center mt-8 md:mt-4"
          >
            <div className="flex md:flex-row flex-col m-auto w-5/6 md:w-full">
              <p className="text-white md:text-4xl text-3xl font-fredoka mr-4">
                Pequeños esfuerzos,
              </p>
              <p
                className="text-4xl font-fredoka text-transparent bg-clip-text "
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e100ff, #7f00ff)",
                }}
              >
                hacen una gran DIFERENCIA!
              </p>
            </div>

            <p className="md:text-xl text-sm font-light text-white font-fredoka md:text-center mt-4 md:px-0 px-8 ml-2 mb-8 md:w-3/5">
              Bienvenido/a de nuevo. Contamos con tu ayuda para transformar la
              vida de un gatito.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col max-w-6/1 m-auto md:mt-12 mt-12">
        {/* FORMULARIO DE INGRESO*/}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          variants={cardVariant}
          className=" md:w-1/2 md:mb-2 mb-4 m-auto"
        >
          <Card
            className="md:p-8 space-y-4 md:w-4/6 rounded-3xl m-auto md:mb-4 mb-2"
            isBlurred
            style={{
              background:
                "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
            }}
          >
            <div className="flex md:flex-row">
              <div className="flex md:flex-row flex-col">
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  src="/cat-friends.png"
                  alt="cat friends"
                  className="md:justify-center mx-auto w-48 h-48 md:w-56 md:h-auto object-cover md:mt-4 md:mb-0 mb-4"
                  style={{
                    filter: "drop-shadow(0px 0px 6px rgba(255, 0, 255, 0.9))",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-col md:ml-4 p-8 space-y-6 bg-opacity-20 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(255, 192, 203, 0.3))",
                  }}
                >
                  <h1
                    className="text-2xl md:text-3xl text-left font-fredoka font-semibold text-transparent bg-clip-text bg-gradient-to-l from-secondary to-white"
                    style={{
                      filter:
                        "drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.08))",
                    }}
                  >
                    Ingresa tus Datos
                  </h1>

                  <div className="w-full flex flex-row flex-wrap gap-48">
                    <Input
                      type="email"
                      label={<span className="text-white">Email</span>}
                      size="lg"
                      color="secondary"
                      placeholder="you@example.com"
                      labelPlacement="outside"
                      endContent={
                        <Icon
                          path={mdiEmail}
                          size={1.5}
                          className="text-4xl text-secondary-600 pointer-events-none flex-shrink-0"
                          style={{
                            filter:
                              "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
                            color: "#e814b8",
                          }}
                        />
                      }
                      variant="bordered"
                      className="mb-0 text-white font-fredoka font-semibold"
                    />
                  </div>

                  <div className="w-full flex flex-row flex-wrap gap-48">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      label={<span className="text-white">Contraseña</span>}
                      size="lg"
                      color="secondary"
                      placeholder="mín. 6 carácteres"
                      labelPlacement="outside"
                      endContent={
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="mr-2 text-secondary-600"
                          >
                            <Icon
                              path={isPasswordVisible ? mdiEyeOff : mdiEye}
                              size={0.8}
                              className="text-secondary"
                            />
                          </button>
                          <Icon
                            path={mdiKey}
                            size={1.5}
                            className="text-4xl text-secondary-600 pointer-events-none flex-shrink-0"
                            style={{
                              filter:
                                "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
                              color: "#e814b8",
                            }}
                          />
                        </div>
                      }
                      variant="bordered"
                      className="mb-0 text-white font-fredoka font-semibold"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* BOTÓN DE INGRESAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          variants={cardVariant}
          className="flex justify-center md:w-3/6 w-full md:mb-2 mb-24 m-auto"
        >
          <NextUIButton
            as={motion.button}
            whileHover={{
              scale: 1,
              background:
                "linear-gradient(to right, rgba(225, 0, 255, 1), rgba(127, 0, 255, 1))",
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.9,
              background:
                "linear-gradient(to right, rgba(225, 0, 255, 1), rgba(127, 0, 255, 1))",
            }}
            color="secondary"
            href="#"
            radius="lg"
            className="text-white text-2xl m-auto md:w-4/6 w-5/6 font-semibold font-fredoka p-8"
            style={{
              background:
                "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
            }}
          >
            <div className="flex items-center justify-center text-3xl">
              Ingresar
              <img
                src="/paw.png"
                alt="Paw Icon"
                className="ml-2 h-10 w-auto mb-1 opacity-80"
                style={{
                  filter: "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.5))",
                  transform: "rotate(15deg)",
                }}
              />
            </div>
          </NextUIButton>
        </motion.div>
      </div>

      <h1 className="md:text-xl text-center font-fredoka text-white md:mt-20 md:mb-24 mb-24 px-8">
        <span className="flex flex-col md:flex-row items-center justify-center">
          ¿No tienes una cuenta?{" "}
          <a
            href=""
            className="font-semibold text-2xl transition-colors duration-300 ml-2 md:ml-3 flex items-center text-transparent bg-clip-text my-2"
            style={{
              backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => navigate("/register")}
          >
            Registrar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="url(#gradient1)"
              className="md:w-8 md:h-8 w-8 h-8 md:ml-2 ml-2"
            >
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e100ff" />
                  <stop offset="100%" stopColor="#7f00ff" />
                </linearGradient>
              </defs>
              <path d={mdiAccountHeartOutline} />
            </svg>
          </a>
        </span>
      </h1>
      <h1 className="md:text-xl text-center font-fredoka text-white mb-12 px-8">
        Al registrarte, aceptas los{" "}
        <a
          href=""
          className="text-secondary font-semibold transition-colors duration-300"
        >
          Términos y Condiciones
        </a>{" "}
        de uso del servicio de AdoptMeow.
      </h1>
      <h1 className="md:text-l text-center font-opensans text-white mb-12 px-8">
        AdoptMeow 2024. Todos los derechos registrados. propiedad de Piwi S.A.
      </h1>
    </div>
  );
};

export default Register;
