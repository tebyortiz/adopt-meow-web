import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  AvatarGroup,
  Button as NextUIButton,
  Card,
  CardHeader,
  CardBody,
  Link,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import {
  mdiMapSearchOutline,
  mdiTagHeartOutline,
  mdiFileDocumentOutline,
  mdiHandshakeOutline,
  mdiLightbulbOutline,
  mdiAccountHeartOutline,
  mdiMapMarkerRadiusOutline,
} from "@mdi/js";
import { useState } from "react";

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

const cardData = [
  {
    id: 1,
    icon: mdiMapSearchOutline,
    title: "GEOLOCALIZACIÓN",
    description:
      "A través de un mapa interactivo, podrás encontrar gatitos cercanos a ti y postularte para su adopción.",
  },
  {
    id: 2,
    icon: mdiFileDocumentOutline,
    title: "MICHIPERFIL",
    description:
      'Podrás ver la foto y los datos del gatito en su "MichiPerfil" con sus características más importantes.',
  },
  {
    id: 3,
    icon: mdiHandshakeOutline,
    title: "CONECTAR",
    description:
      "Podrás conectar con otros usuarios, postulando un gatito para su adopción, o aplicar a la adopción de algún gatito.",
  },
  {
    id: 4,
    icon: mdiTagHeartOutline,
    title: "AMOR GATUNO",
    description:
      "Al adoptar, experimentarás el amor y la compañía incondicional de un gatito que necesita un hogar.",
  },
];

const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
        {/* Navbar */}
        <Navbar
          shouldHideOnScroll
          isBlurred
          className="bg-background/10 w-full h-24"
          maxWidth="full"
        >
          <NavbarBrand>
            <div className="flex items-center md:ml-12">
              <Avatar
                src="/adopt1.png"
                size="lg"
                className="shadow-[0_0_10px_rgba(255,255,255,0.7)] w-12 h-auto p-1 md:h-14 md:w-auto md:p-2 object-cover"
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
                >
                  Sign Up
                </NextUIButton>
              </motion.div>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Main content */}
        <div className="flex flex-col items-center px-4 pt-24 pb-12 text-white">
          {/* PRIMERA SECCIÓN */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto mb-24 md:mb-72 md:mt-12">
            <div className="flex flex-col text-center md:text-left md:w-2/3">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-4xl md:text-6xl font-semi-bold md:mb-12 mb-8 font-fredoka"
              >
                ¿Adoras a los gatitos?
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-2xl md:text-3xl font-semi-bold md:mb-8 font-fredoka"
              >
                NOSOTROS TAMBIÉN.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="text-4xl md:text-5xl mt-8 font-fredoka text-transparent w-full bg-clip-text bg-gradient-to-r from-secondary to-white"
              >
                La adopción responsable es un <br /> ACTO DE AMOR
              </motion.p>
            </div>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              src="/cat-love4.png"
              alt="cat love"
              className="w-48 h-48 md:w-96 md:h-auto object-contain mt-8 md:mt-0 md:ml-auto"
            />
          </div>

          {/* SECCIÓN ARG */}
          <div className="w-full max-w-6xl mx-auto p-0 md:mb-96 mb-36">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={cardVariant}
              className="flex flex-col md:flex-row items-center justify-center w-full"
            >
              <img
                src="/arg-map1.png"
                alt="arg map"
                className="w-24 h-auto md:w-48 md:h-auto object-contain mt-8 md:mt-0 md:mr-24"
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                variants={cardVariant}
                className="flex flex-col items-center md:items-start md:text-left mt-8 md:mt-0"
              >
                <div className="inline-flex items-center md:mb-4">
                  <div className="bg-black/20 md:p-4 p-2 border-secondary/30 border-4 rounded-full flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary/30 rounded-full shadow-icon md:mr-4 mr-2">
                      <Icon
                        path={mdiMapMarkerRadiusOutline}
                        size={1.5}
                        color="#e814b8"
                      />
                    </div>
                    <h1 className="md:text-4xl text-2xl px-2 font-fredoka whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                      La realidad de Argentina
                    </h1>
                  </div>
                </div>
                <p className="md:text-xl font-light font-fredoka md:text-left text-center mt-4 md:px-0 px-6">
                  En nuestro país hay una realidad dura y cruel. 6 de cada 10
                  gatitos de la calle mueren por inanición o por condiciones
                  climáticas extremas. Además, la población felina callejera se
                  incrementa año tras año por la ausencia de políticas
                  sanitarias y veterinarias.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-secondary to-white rounded-full md:mt-8 mt-2 md:w-5/6 w-4/6"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* MISIÓN DE ADOPTMEOW */}
          <motion.div
            className="flex flex-col md:items-start md:justify-start items-center w-full max-w-6xl mx-auto md:mb-96 mb-36"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            variants={cardVariant}
          >
            <div className="inline-flex items-center md:mb-4">
              <div className="bg-black/20 md:p-4 p-2 border-secondary/30 border-4 rounded-full flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/30 rounded-full shadow-icon md:mr-4 mr-2">
                  <Icon path={mdiLightbulbOutline} size={1.5} color="#e814b8" />
                </div>
                <h3 className="md:text-4xl text-2xl px-2 font-fredoka whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                  ¿Por qué AdoptMeow?
                </h3>
              </div>
            </div>
            <p className="md:text-xl font-light font-fredoka md:text-left text-center mt-4 md:px-0 px-6">
              AdoptMeow es una plataforma dedicada a conectar a gatitos sin
              hogar con personas dispuestas a brindarles un nuevo hogar lleno de
              amor. Nos aseguramos de que cada adopción sea responsable y
              segura, proporcionando toda la información necesaria sobre cada
              gatito, conectando con adoptantes responsables.
            </p>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-white rounded-full md:mt-8 mt-2 md:w-3/6 w-2/6"></div>
          </motion.div>

          {/* CARDS */}
          <motion.div
            className=" md:p-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            variants={cardVariant}
          >
            <h2 className="md:text-2xl text-l font-fredoka font-light text-center">
              Vas a poder encontrar los siguientes beneficios:
            </h2>
          </motion.div>

          <div className="w-full md:max-w-6xl items-center mx-auto md:mb-72 mb-36">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {cardData.map((card, index) => (
                <motion.div
                  key={card.id}
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 10px rgba(232, 20, 184, 0.5)",
                    transition: { duration: 0.5 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  variants={cardVariant}
                  custom={index}
                  className="rounded-3xl overflow-hidden"
                >
                  <Card
                    className="md:w-full md:h-72 w-3/4 h-64 rounded-3xl mx-auto px-2"
                    isBlurred
                    style={{
                      background:
                        "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
                    }}
                  >
                    <CardHeader className="flex flex-col items-center space-y-2 md:mt-4 mt-2">
                      <motion.div
                        className={`flex items-center justify-center w-12 h-12 md:mb-2 mb-2 bg-secondary/30 rounded-full ${
                          hoveredCard === card.id ? "shadow-icon" : ""
                        }`}
                      >
                        <Icon
                          path={card.icon}
                          size={1.5}
                          color={
                            hoveredCard === card.id ? "#e814b8" : "#5e35b1"
                          }
                        />
                      </motion.div>
                      <motion.h3
                        className={`text-secondary text-xl md:text-2xl font-ubuntu font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white ${
                          hoveredCard === card.id ? "shadow-text" : ""
                        }`}
                      >
                        {card.title}
                      </motion.h3>
                    </CardHeader>
                    <CardBody className="flex items-center space-y-6">
                      <p className="text-white font-fredoka text-center text-l p-1">
                        {card.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECCIÓN ESTADÍSTICAS */}
          <div className="w-full max-w-6xl p-0 md:mb-56 mb-24 md:ml-24">
            <div className="flex flex-col md:flex-row items-center justify-around w-full px-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                variants={cardVariant}
                className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-0  md:mr-24 space-x-2"
              >
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <p className="md:text-6xl text-5xl font-fredoka text-secondary">
                    +
                  </p>
                  <p className="md:text-2xl text-xl font-fredoka font-light">
                    de 132 usuarios registrados
                  </p>
                </div>
                <AvatarGroup isBordered max={6} total={126} color="secondary">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                variants={cardVariant}
                className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-0  md:mr-24 space-x-2"
              >
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <p className="md:text-6xl text-5xl font-fredoka text-secondary">
                    +
                  </p>
                  <p className="md:text-2xl text-xl font-fredoka font-light">
                    de 78 gatitos encontraron hogar
                  </p>
                </div>
                <AvatarGroup isBordered max={6} total={72} color="secondary">
                  <Avatar src="data:image/jpeg;base64,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" />
                  <Avatar src="data:image/jpeg;base64,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" />
                  <Avatar src="data:image/jpeg;base64,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" />
                  <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpaVMQcDuI2z-LGDT3T_8Di2ox0OZXJiWIA&s" />
                  <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3fgYOGKWJChF6ad5YPuDY8Q-bBATmLo6dQ&s" />
                  <Avatar src="data:image/jpeg;base64,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" />
                </AvatarGroup>
              </motion.div>
            </div>
          </div>

          {/* SECCIÓN INVITANDO A REGISTRARSE */}
          <div className="flex flex-col md:flex-row md:items-start w-full md:max-w-5xl mx-auto md:mb-56 mb-24 ">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={cardVariant}
              className="flex flex-col md:items-center justify-center md:w-3/5 w-full mb-24 md:mb-0  p-4 min-h-[240px]"
            >
              <div className="flex justify-center items-center md:mb-8 mb-4 md:mt-2">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/30 rounded-full md:mr-4 mr-2 shadow-icon">
                  <Icon
                    path={mdiAccountHeartOutline}
                    size={1.5}
                    color="#e814b8"
                  />
                </div>
                <h3 className="md:text-5xl text-3xl font-fredoka text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                  Sé parte del cambio!
                </h3>
              </div>
              <p className="md:text-xl text-white font-fredoka font-light md:w-5/6 md:text-left text-center">
                Únete a nuestra maravillosa comunidad y ayuda a cambiar la vida
                de un gatito. Cada miembro cuenta y tu participación es esencial
                para que más gatitos encuentren un hogar lleno de amor.
                ¡Regístrate y sé parte del cambio!
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={cardVariant}
            >
              <Card
                isBlurred
                className="flex flex-col items-center md:items-center md:w-5/5 p-8 mx-2 rounded-3xl min-h-[240px] shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(to left, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(255, 192, 203, 0.2))",
                }}
              >
                <div className="flex items-center mb-8">
                  <Avatar
                    src="/adopt1.png"
                    size="lg"
                    className="shadow-[0_0_10px_rgba(255,255,255,0.7)] h-14 w-auto object-cover p-2"
                  />
                  <p className="ml-4 text-inherit text-white text-4xl font-semi-bold font-fredoka">
                    AdoptMeow
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 w-4/5">
                  <p className="text-2xl font-fredoka text-white mb-4">
                    Registrarse ahora
                  </p>
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
                  >
                    Sign Up
                  </NextUIButton>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="w-full py-8"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 192, 203, 0.2), rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2))",
          }}
        >
          <div className="max-w-6xl md:mx-auto px-4 md:mb-20 mb-12">
            <div className="flex flex-wrap justify-between">
              <div className="w-full flex items-center justify-center mb-8 md:mb-0 md:w-1/5">
                <span className=" text-white">AdoptMeow 2024</span>
              </div>

              <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-center">
                <h5 className="text-secondary-600 font-bold mb-4">LEGAL</h5>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-center">
                <h5 className="text-secondary-600 font-bold mb-4">LINKS</h5>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Faq
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-center">
                <h5 className="text-secondary-600 font-bold mb-4">SOCIAL</h5>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-1/2 md:w-1/5 text-center">
                <h5 className="text-secondary-600 font-bold mb-4">COMPANY</h5>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Official Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="#"
                      color="secondary"
                      className="text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 md:h-32 h-24 bg-gradient-to-t from-black to-transparent z-20"></div>
    </div>
  );
};

export default LandingPage;
