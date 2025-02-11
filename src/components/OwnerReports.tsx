import { useEffect, useState } from "react";
import { UserRegistrationData } from "../models/UserRegistrationData";
import { useCats } from "../context/CatContext";
import { useAuth } from "../context/authContext";
import { CatData } from "../models/CatData";
import {
  Button as NextUIButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { motion } from "framer-motion";

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

const OwnerReports = () => {
  const { getCats, cats, updateCatOwner, confirmAdoption } = useCats();
  const { getUserById } = useAuth();
  const [filteredCats, setFilteredCats] = useState<CatData[]>([]);
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [adopters, setAdopters] = useState<UserRegistrationData[]>([]);
  const [selectedAdopter, setSelectedAdopter] =
    useState<UserRegistrationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adoptedCatName, setAdoptedCatName] = useState("");
  const [adoptedAdopterName, setAdoptedAdopterName] = useState("");

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await getCats();

          const userCats = cats.filter(
            (cat: CatData) => cat.ownerId === userId
          );

          setFilteredCats(userCats);
        }
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };

    fetchCats();
  }, [getCats]);

  useEffect(() => {
    if (!selectedCat) {
      setAdopters([]);
      return;
    }

    const adopterIds = selectedCat.adopterId ?? [];

    if (adopterIds.length === 0) {
      setAdopters([]);
      return;
    }

    const fetchAdopters = async () => {
      try {
        const adopterData = await Promise.all(
          adopterIds.map(async (adopterId) => {
            const user = await getUserById(adopterId);
            return user;
          })
        );

        setAdopters(
          adopterData.filter(
            (user): user is UserRegistrationData => user !== undefined
          )
        );
      } catch (error) {
        console.error("Error fetching adopters:", error);
      }
    };

    fetchAdopters();
  }, [selectedCat]);

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      setIsModalOpen(false);
      setSelectedCat(null);
      setSelectedAdopter(null);
      setAdopters([]);
    }
  };

  const handlePress = async (adopter: UserRegistrationData) => {
    if (selectedCat && selectedCat._id && adopter.id) {
      try {
        await updateCatOwner(selectedCat._id, adopter.id);
        await confirmAdoption(selectedCat._id, adopter.id);

        setAdoptedCatName(selectedCat.name);
        setAdoptedAdopterName(adopter.username ?? "");

        setIsModalOpen(true);

        setTimeout(() => {
          setSelectedCat(null);
          setSelectedAdopter(null);
        }, 100);
      } catch (error) {
        console.error(
          "Error updating cat owner or confirming adoption:",
          error
        );
      }
    }
  };

  return (
    <div className="flex flex-row p-6 h-screen">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        variants={cardVariant}
        className="flex flex-col w-1/2"
      >
        <div
          className="p-12 h-screen rounded-3xl backdrop-blur-xl mr-4 flex flex-col"
          style={{
            background:
              "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
          }}
        >
          <div className="py-4 justify-center mb-6 -mt-8">
            <p
              className="mb-2 font-fredoka text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Listado de Reportes
            </p>
            <p className="text-white font-fredoka text-md">
              Aquí encontrarás los gatitos postulados y quienes aplicaron para
              su adopción
            </p>
          </div>

          <div className="flex flex-col bg-white bg-opacity-5 rounded-3xl flex-1 p-4 space-y-4 px-10">
            <p className="text-white font-fredoka text-xl text-center mt-4 mb-4">
              Selecciona un gatito para elegir su adoptante.
            </p>

            {filteredCats.length === 0 ? (
              <p
                className="text-white font-fredoka text-lg text-center rounded-3xl p-4 items-center cursor-pointer hover:bg-opacity-90 transition px-4"
                style={{
                  background:
                    "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.3))",
                }}
              >
                No hay reportes de gatitos disponibles.
              </p>
            ) : (
              filteredCats.map((cat) => (
                <motion.div
                  key={cat._id}
                  whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.8, delay: 0.2 }}
                  variants={cardVariant}
                  className="flex flex-row rounded-3xl p-2 items-center cursor-pointer hover:bg-opacity-90 transition px-4"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.3))",
                  }}
                  onClick={() => {
                    setSelectedCat(cat);
                    setSelectedAdopter(null);
                    setAdoptedCatName("");
                    setAdoptedAdopterName("");
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="flex rounded-full w-16 h-16 border-2 border-white object-cover"
                  />
                  <p className="text-white font-fredoka text-2xl ml-4">
                    {cat.name}
                  </p>
                  <p className="text-white font-fredoka text-lg ml-auto mr-2">
                    Postulantes {cat.adopterId ? cat.adopterId.length : 0}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Selección de Adoptantes */}
      {selectedCat &&
        selectedCat.adopterId &&
        selectedCat.adopterId.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={cardVariant}
            className="flex flex-col w-1/2"
          >
            <div
              className="p-4 h-screen rounded-3xl backdrop-blur-xl ml-4 flex flex-col"
              style={{
                background:
                  "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
              }}
            >
              {/* Datos Gatito a Adoptar */}
              <div
                className="flex flex-row items-center rounded-2xl p-4 gap-4 items-center justify-center mx-16 mt-4 mb-8 border-2 border-white border-opacity-40"
                style={{
                  background:
                    "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.4))",
                }}
              >
                <img
                  src={selectedCat.image}
                  alt={selectedCat.name}
                  className="rounded-full h-20 w-20 border-2 border-white shadow-lg object-cover"
                />
                <p className="text-white text-center font-fredoka text-xl">
                  Adopción de {selectedCat.name}
                </p>
              </div>

              <p className="text-white text-center font-fredoka text-xl mb-8">
                Por favor, selecciona el adoptante para su entrega:
              </p>

              {/* Adoptantes que aplicaron para la adopción del gatito */}
              <div className="flex flex-col space-y-4 mx-16 bg-white bg-opacity-5 rounded-3xl p-8">
                {adopters.map((adopter) => (
                  <motion.div
                    key={adopter.id}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 0.2 }}
                    variants={cardVariant}
                    className="flex flex-row rounded-3xl p-4 items-center cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.3))",
                    }}
                    onClick={() => setSelectedAdopter(adopter)}
                  >
                    <img
                      src={adopter.image}
                      alt={adopter.username}
                      className="flex rounded-full w-16 h-16 border-2 border-white object-cover"
                    />
                    <p className="text-white font-fredoka text-2xl ml-4">
                      {adopter.username}
                    </p>
                    <img
                      src="/adopt1.png"
                      className="flex w-16 h-auto object-contain ml-auto"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Div de confirmación */}
              {selectedAdopter && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  variants={cardVariant}
                  className=" flex flex-col mt-auto rounded-3xl p-4 mx-16 items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.4))",
                  }}
                >
                  <p className="text-white text-center font-fredoka text-xl">
                    ¿Confirmas la entrega de {selectedCat.name} a{" "}
                    {selectedAdopter.username}?
                  </p>
                  <div className="flex flex-col space-y-4 mt-4">
                    <NextUIButton
                      onClick={() => {
                        console.log(
                          `Gato entregado a ${selectedAdopter?.username}`
                        );
                        handlePress(selectedAdopter);
                      }}
                      variant="flat"
                      className="bg-white bg-opacity-5 text-white font-fredoka text-md rounded-2xl px-6 py-8 flex items-center gap-2 border-2 border-white border-opacity-30"
                    >
                      <p className="text-white">Entregar</p>
                      <img
                        src={"/heart.png"}
                        className="w-12 h-auto object-contain"
                        alt="heart icon"
                      />
                    </NextUIButton>

                    <button
                      className="text-white font-fredoka text-md"
                      onClick={() => setSelectedAdopter(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
        backdrop="opaque"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col items-center justify-center gap-2">
            <img src="/adopt1.png" alt="Confirmación" className="w-16 h-auto" />
            <h2 className="text-secondary font-fredoka text-lg text-center">
              Adopción Exitosa
            </h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-[#626262] font-fredoka text-lg text-center">
              {adoptedCatName && adoptedAdopterName ? (
                <>
                  Muy bien, <b>{adoptedCatName}</b> ahora estará al cuidado de{" "}
                  <b>{adoptedAdopterName}</b>. Deberás contactarte para la
                  entrega.
                </>
              ) : (
                "Cargando información..."
              )}
            </p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <NextUIButton
              className="text-white font-fredoka text-lg"
              color="secondary"
              onPress={() => setIsModalOpen(false)}
            >
              Cerrar
            </NextUIButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OwnerReports;
