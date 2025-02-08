import { useEffect, useState } from "react";
import { UserRegistrationData } from "../models/UserRegistrationData";
import { useCats } from "../context/CatContext";
import { useAuth } from "../context/authContext";
import { CatData } from "../models/CatData";
import { Button as NextUIButton } from "@nextui-org/react";

const OwnerReports = () => {
  const { getCats, cats, updateCatOwner, confirmAdoption } = useCats();
  const { getUserById } = useAuth();
  const [filteredCats, setFilteredCats] = useState<CatData[]>([]);
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [adopters, setAdopters] = useState<UserRegistrationData[]>([]);
  const [selectedAdopter, setSelectedAdopter] =
    useState<UserRegistrationData | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await getCats();
          const notAdoptedCats = cats.filter(
            (cat: CatData) =>
              !cat.adopted && !(cat.adopterId && cat.adopterId.includes(userId))
          );
          setFilteredCats(notAdoptedCats);
        }
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };
    fetchCats();
  }, [cats]);

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

  const handlePress = async (adopter: UserRegistrationData) => {
    if (selectedCat && selectedCat._id && adopter.id) {
      try {
        await updateCatOwner(selectedCat._id, adopter.id);
        await confirmAdoption(selectedCat._id, adopter.id);
        setSelectedAdopter(adopter);

        // Oculta la sección de adoptantes después de confirmar
        setTimeout(() => {
          setSelectedCat(null);
          setSelectedAdopter(null);
        }, 500); // Agrega un pequeño delay para que se note la interacción
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
      <div className="flex flex-col w-1/2">
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

          <div className="flex flex-col bg-white bg-opacity-5 w-full rounded-3xl flex-1 p-8 space-y-4">
            {filteredCats.map((cat) => (
              <div
                key={cat._id}
                className="flex flex-row bg-white bg-opacity-5 rounded-3xl p-4 items-center cursor-pointer hover:bg-opacity-10 transition"
                onClick={() => {
                  setSelectedCat(cat);
                  setSelectedAdopter(null);
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="flex rounded-full w-12 h-12 object-cover"
                />

                <p className="text-white font-fredoka text-2xl ml-4">
                  {cat.name}
                </p>

                <p className="text-white font-fredoka text-2xl ml-auto">
                  Postulantes {cat.adopterId ? cat.adopterId.length : 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selección de Adoptantes */}
      {selectedCat &&
        selectedCat.adopterId &&
        selectedCat.adopterId.length > 0 && (
          <div className="flex flex-col w-1/2">
            <div
              className="p-4 h-screen rounded-3xl backdrop-blur-xl ml-4 flex flex-col"
              style={{
                background:
                  "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
              }}
            >
              {/* Datos Gatito a Adoptar */}
              <div className="p-4 bg-white bg-opacity-5 rounded-3xl h-auto space-y-4 mt-6 mb-8 mx-16">
                <img
                  src={selectedCat.image}
                  alt={selectedCat.name}
                  className="rounded-full h-48 w-48 border-2 border-white shadow-lg object-cover m-auto"
                />
                <p className="text-white text-center font-fredoka text-md">
                  Adopción de {selectedCat.name}
                </p>
              </div>

              <p className="text-white text-center font-fredoka text-md mb-8">
                Por favor, selecciona el adoptante:
              </p>

              {/* Adoptantes que aplicaron para la adopción del gatito */}
              <div className="flex flex-col space-y-4 mx-16">
                {adopters.map((adopter) => (
                  <div
                    key={adopter.id}
                    className="flex flex-row bg-white bg-opacity-5 rounded-3xl p-4 items-center"
                  >
                    <img
                      src={adopter.image}
                      alt={adopter.username}
                      className="flex rounded-full w-12 h-12 object-cover"
                    />
                    <p className="text-white font-fredoka text-2xl ml-4">
                      {adopter.username}
                    </p>
                    {/* Botón para confirmar adopción */}
                    <img
                      src={"/adopt1.png"}
                      className="flex rounded-full w-16 h-auto object-contain ml-auto cursor-pointer"
                      onClick={() => setSelectedAdopter(adopter)} // Setear el adoptante al hacer click
                    />
                  </div>
                ))}
              </div>

              {/* Div de confirmación */}
              {selectedAdopter && (
                <div className=" flex flex-col mt-auto bg-white bg-opacity-5 rounded-3xl p-4 mx-16 items-center justify-center">
                  <p className="text-white text-center font-fredoka text-md">
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
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default OwnerReports;
