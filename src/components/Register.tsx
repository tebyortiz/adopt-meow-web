import Icon from "@mdi/react";
import {
  mdiAccountDetails,
  mdiEmail,
  mdiKey,
  mdiLinkBoxVariantOutline,
  mdiEye,
  mdiEyeOff,
  mdiLogin,
} from "@mdi/js";
import { motion } from "framer-motion";
import { Card, Input, Button as NextUIButton } from "@nextui-org/react";
import { useState } from "react";
import catImage from "/public/cat1.png";
import adoptImage from "/public/adopt1.png";

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
  const [selectedOption, setSelectedOption] = useState<
    "postular" | "adoptar" | null
  >(null);
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
            <div className="flex md:flex-row flex-col m-auto">
              <p className="text-white text-4xl font-fredoka mr-4">
                REGÍSTRATE
              </p>
              <p
                className="text-4xl font-fredoka text-transparent bg-clip-text "
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e100ff, #7f00ff)",
                }}
              >
                Es totalmente gratis!
              </p>
            </div>

            <p className="md:text-xl text-sm font-light text-white font-fredoka md:text-center mt-4 md:px-0 px-8 ml-2 mb-8 md:w-3/5">
              En simples pasos, vas a poder formar parte de la comunidad de
              amantes de gatitos más grande de Argentina!
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto md:ml-72 md:mt-24 mt-12 md:mb-24 mb-24 space-y-4 md:space-y-0 md:space-x-6">
        {/* FORMULARIO*/}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          variants={cardVariant}
          className="w-full md:w-1/2 m-auto mb-2"
        >
          <Card
            className="p-8 space-y-4 md:w-4/6 w-5/6 rounded-3xl m-auto md:ml-48 relative z-10"
            isBlurred
            style={{
              background:
                "linear-gradient(to left, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
            }}
          >
            <h1 className="text-2xl text-center font-fredoka font-semibold text-transparent bg-clip-text bg-gradient-to-l from-secondary to-white">
              Datos de Usuario
            </h1>

            <div className="w-full flex flex-row flex-wrap gap-4">
              <Input
                type="text"
                label={<span className="text-white">Nombre Completo</span>}
                size="lg"
                color="secondary"
                placeholder="Nombre y Apellido"
                labelPlacement="outside"
                endContent={
                  <Icon
                    path={mdiAccountDetails}
                    size={1.5}
                    className="text-4xl text-secondary-600 pointer-events-none flex-shrink-0"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
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
                      filter: "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
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
                        filter: "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
                        color: "#e814b8",
                      }}
                    />
                  </div>
                }
                variant="bordered"
                className="mb-0 text-white font-fredoka font-semibold"
              />
            </div>

            <div className="w-full flex flex-row flex-wrap gap-48">
              <Input
                type="url"
                label={
                  <span className="text-white">Url de la imagen de perfil</span>
                }
                size="lg"
                color="secondary"
                placeholder=""
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none">
                    <span className="text-default-400 text-medium font-light">
                      https://
                    </span>
                  </div>
                }
                endContent={
                  <Icon
                    path={mdiLinkBoxVariantOutline}
                    size={1.5}
                    className="text-4xl text-secondary-600 pointer-events-none flex-shrink-0"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(232, 20, 184, 0.9))",
                      color: "#e814b8",
                    }}
                  />
                }
                variant="bordered"
                className="mb-0 text-white font-fredoka font-semibold"
              />
            </div>
          </Card>
        </motion.div>

        {/* TIPO DE USUARIO */}
        <div className="flex flex-col md:w-1/2 md:max-w-6xl space-y-6 m-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            variants={cardVariant}
          >
            <Card
              className="p-8 space-y-6 rounded-3xl "
              isBlurred
              style={{
                background:
                  "linear-gradient(to left, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
              }}
            >
              <div className="space-y-2 items-center max-w-6xl">
                <h2 className="text-2xl text-center font-fredoka font-semibold text-transparent bg-clip-text bg-gradient-to-l from-secondary to-white mb-8 md:mb-10">
                  Deseo:
                </h2>
                <div className="flex gap-4 md:flex-row flex-col">
                  <Card
                    isPressable
                    isHoverable
                    style={{
                      background:
                        selectedOption === "postular"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
                    }}
                    className={`flex-1 p-4 cursor-pointer h-56 w-72 rounded-3xl items-center ${
                      selectedOption === "postular"
                        ? "border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        : ""
                    }`}
                    onClick={() => setSelectedOption("postular")}
                  >
                    <motion.p
                      initial={{
                        color: "rgba(255, 255, 255, 0.4)",
                      }}
                      animate={{
                        color:
                          selectedOption === "postular"
                            ? "#ffffff"
                            : "rgba(255, 255, 255, 0.4)",
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-fredoka font-semibold m-auto"
                    >
                      Postular un gatito
                    </motion.p>
                    <motion.div
                      animate={{
                        scale: selectedOption === "postular" ? 1.7 : 1,
                        filter:
                          selectedOption === "postular"
                            ? "grayscale(0%) saturate(3)"
                            : "grayscale(100%)",
                      }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center items-center h-full"
                    >
                      <img
                        src={catImage}
                        alt="Postular"
                        className="h-32 w-32 object-contain mt-4"
                      />
                    </motion.div>
                  </Card>
                  <Card
                    isPressable
                    isHoverable
                    style={{
                      background:
                        selectedOption === "adoptar"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
                    }}
                    className={`flex-1 p-4 cursor-pointer h-56 rounded-3xl items-center ${
                      selectedOption === "adoptar"
                        ? "border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        : ""
                    }`}
                    onClick={() => setSelectedOption("adoptar")}
                  >
                    <motion.p
                      initial={{
                        color: "rgba(255, 255, 255, 0.4)",
                      }}
                      animate={{
                        color:
                          selectedOption === "adoptar"
                            ? "#ffffff"
                            : "rgba(255, 255, 255, 0.4)",
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-fredoka font-semibold m-auto"
                    >
                      Adoptar un gatito
                    </motion.p>
                    <motion.div
                      animate={{
                        scale: selectedOption === "adoptar" ? 1.6 : 1,
                        filter:
                          selectedOption === "adoptar"
                            ? "grayscale(0%) saturate(1.2)"
                            : "grayscale(100%)",
                      }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center items-center h-full"
                    >
                      <img
                        src={adoptImage}
                        alt="Adoptar"
                        className="h-32 w-32 object-contain mt-8"
                      />
                    </motion.div>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* BOTÓN DE REGISTRO */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 1.4, delay: 0.6 }}
            variants={cardVariant}
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
              className="text-white text-2xl w-full font-semibold m-auto font-fredoka p-8"
              style={{
                background:
                  "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
              }}
            >
              Crear Cuenta
            </NextUIButton>
          </motion.div>
        </div>
      </div>

      {/* INFO Y T&C */}
      <h1 className="md:text-xl text-center font-fredoka text-white md:mb-24 mb-24 px-8">
        <span className="flex items-center justify-center">
          ¿Ya tienes una cuenta?{" "}
          <a
            href=""
            className="font-semibold transition-colors duration-300 ml-2 md:ml-3 flex items-center text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ingresar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="url(#gradient1)"
              className="md:w-8 md:h-8 w-6 h-6 mt-1"
            >
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e100ff" />
                  <stop offset="100%" stopColor="#7f00ff" />
                </linearGradient>
              </defs>
              <path d={mdiLogin} />
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
