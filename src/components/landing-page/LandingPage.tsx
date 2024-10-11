import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
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
        <div className="absolute inset-0 bg-[url('/bg-landing-page2.jpg')] bg-no-repeat bg-cover bg-center filter blur-sm scale-110"></div>
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
          </motion.div>

          {/* CARDS */}
          <motion.div
            className="bg-black/20 md:p-4 p-2 border-secondary/30 border-4 rounded-full mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            variants={cardVariant}
          >
            <h2 className="md:text-2xl text-l font-fredoka font-light text-center">
              Vas a poder encontrar los siguientes beneficios:
            </h2>
          </motion.div>

          <div className="w-full md:max-w-6xl items-center mx-auto md:mb-96 mb-36">
            <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 ">
              {cardData.map((card, index) => (
                <motion.div
                  key={card.id}
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                    transition: { duration: 0.2 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                  variants={cardVariant}
                  custom={index}
                  className="rounded-3xl overflow-hidden"
                >
                  <Card
                    className="md:w-full md:h-72 w-3/4 h-56 bg-black/10 border-secondary/30 border-4 rounded-3xl mx-auto"
                    isBlurred
                  >
                    <CardHeader className="flex items-center justify-center space-x-2 mt-4">
                      <motion.div
                        className={`flex items-center justify-center w-12 h-12 bg-secondary/30 rounded-full ${
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
                        className={`text-secondary text-xl font-fredoka font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white ${
                          hoveredCard === card.id ? "shadow-text" : ""
                        }`}
                      >
                        {card.title}
                      </motion.h3>
                    </CardHeader>
                    <CardBody className="flex items-center justify-center space-y-6">
                      <p className="text-white font-fredoka text-center text-l p-1">
                        {card.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECCIÓN INVITANDO A REGISTRARSE */}
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full md:max-w-6xl mx-auto md:mb-56 mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={cardVariant}
              className="flex flex-col md:items-start justify-center md:w-3/5 w-full mb-24 md:mb-0 md:p-8 p-4 min-h-[240px]"
            >
              <div className="flex justify-center md:mb-8 mb-4">
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
                className="flex flex-col md:items-start items-center md:items-center md:w-5/5 md:ml-4 p-8 bg-background/5 border-secondary/30 border-4 rounded-3xl min-h-[240px]"
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
                <div className="flex flex-col items-center justify-center p-4 w-4/5 ">
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
        <div className="w-full py-8 border-t border-secondary-800">
          <div className="max-w-6xl md:mx-auto px-4 mb-20">
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

      <div className="fixed bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
    </div>
  );
};

export default LandingPage;
