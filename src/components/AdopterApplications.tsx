import { useEffect, useState } from "react";
import { useCats } from "../context/CatContext";
import { CatData } from "../models/CatData";
import { Button as NextUIButton } from "@nextui-org/react";

const AdopterApplications = () => {
  const { getCats, cats, deleteCat, removeAdopter } = useCats();
  const [adoptedCats, setAdoptedCats] = useState<CatData[]>([]);
  const [novedadTypes, setNovedadTypes] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const fetchAdoptedCats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in AsyncStorage");

        await getCats();
        const adoptedCats = cats.filter((cat) =>
          cat.adopterId?.includes(userId)
        );
        setAdoptedCats(adoptedCats);

        const resolvedNovedadTypes = await Promise.all(
          adoptedCats.map((cat) => getNovedadType(cat))
        );
        setNovedadTypes(resolvedNovedadTypes);
      } catch (error) {
        console.error("Error fetching adopted cats:", error);
      }
    };

    fetchAdoptedCats();
  }, []);

  const getNovedadType = async (cat: CatData): Promise<string> => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return "";

      if (cat.adopted && cat.adopterId?.includes(userId)) {
        return cat.ownerId === userId ? "Aprobado" : "No Aprobado";
      } else if (!cat.adopted && cat.adopterId?.includes(userId)) {
        return "En Revisión";
      }

      return "";
    } catch (error) {
      console.error("Error getting user ID from AsyncStorage:", error);
      return "";
    }
  };

  const handleDeleteNotification = async (catId: string, type: string) => {
    try {
      if (type === "Aprobado") {
        await deleteCat(catId);
      } else if (type === "No Aprobado") {
        await removeAdopter(catId);
      }

      setAdoptedCats((prevCats) => prevCats.filter((cat) => cat._id !== catId));
      setNovedadTypes((prevTypes) =>
        prevTypes.filter((_, idx) => adoptedCats[idx]._id !== catId)
      );

      setSelectedCat(null);
      setSelectedStatus("");
    } catch (error) {
      console.error("Error handling delete notification:", error);
    }
  };

  return (
    <div className="flex flex-row p-6 h-screen">
      {/* Lista de postulaciones */}
      <div className="flex flex-col w-1/2">
        <div
          className="p-12 h-screen rounded-3xl backdrop-blur-xl mr-4 flex flex-col"
          style={{
            background:
              "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
          }}
        >
          <div className="py-4 justify-center mb-1 -mt-8">
            <p
              className="mb-2 font-fredoka text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tu Lista de Postulaciones
            </p>
            <p className="text-white font-fredoka text-md">
              Aquí encontrarás la lista de gatitos a los que aplicaste para su
              adopción, y el estado de cada postulación.
            </p>
          </div>

          <div className="flex flex-col bg-white bg-opacity-5 w-full rounded-3xl flex-1 p-4 space-y-4 px-10">
          <p className="text-white font-fredoka text-xl text-center mt-4 mb-4">
              Selecciona un gatito para ver el estado de la postulación.
            </p>
            {adoptedCats.map((cat, index) => (
              <div
                key={cat._id}
                className="flex flex-row rounded-3xl p-2 items-center cursor-pointer hover:bg-opacity-90 transition px-4"
                style={{
                  background:
                    "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.3))",
                }}
                onClick={() => {
                  setSelectedCat(cat);
                  setSelectedStatus(novedadTypes[index]);
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

                {/* Estado de la postulación con icono */}
                <div className="flex ml-auto mr-1">
                  {novedadTypes[index] === "En Revisión" && (
                    <img
                      src="/clock.png"
                      alt="En Revisión"
                      className="w-10 h-10 object-contain"
                    />
                  )}
                  {novedadTypes[index] === "Aprobado" && (
                    <img
                      src="/confirm.png"
                      alt="Aprobado"
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  {novedadTypes[index] === "No Aprobado" && (
                    <img
                      src="/denied.png"
                      alt="No Aprobado"
                      className="w-10 h-10 object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalles de la postulación seleccionada */}
      {selectedCat && (
        <div className="flex flex-col w-1/2">
          <div
            className="p-4 h-screen rounded-3xl backdrop-blur-xl ml-4"
            style={{
              background:
                "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
            }}
          >
            <p
              className="mt-10 mb-12 text-center font-fredoka text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Información de la Postulación
            </p>
            {selectedCat && (
              <div className="bg-white bg-opacity-5 p-8 rounded-3xl mx-16 flex flex-col items-center">
               <div
                className="flex flex-row items-center justify-center rounded-2xl p-4 gap-4 w-5/6 mb-8 items-center border-2 border-white border-opacity-40"
                style={{
                  background:
                    "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.4))",
                }}
              >
                  <img
                    src={selectedCat.image}
                    alt={selectedCat.name}
                    className="rounded-full w-20 h-20 border-2 border-white object-cover"
                  />
                  <p className="text-white font-fredoka text-xl">
                    Postulación a la adopción de {selectedCat.name}
                  </p>
                </div>

                {/* Estado con imagen correspondiente */}
                <div className="flex items-center justify-center rounded-3xl p-8 w-5/6 gap-2 mb-12"
                style={{
                  background:
                    "linear-gradient(to right, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.3))",
                }}>
                  <p className="text-white font-fredoka text-2xl mr-2">
                    Estado:
                  </p>

                  {selectedStatus === "En Revisión" && (
                    <div className="flex items-center space-x-3 p-1">
                      <p className="text-white font-fredoka text-2xl">
                        En Revisión
                      </p>
                      <img
                        src="/clock.png"
                        alt="En Revisión"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}

                  {selectedStatus === "Aprobado" && (
                    <div className="flex items-center space-x-3">
                      <p className="text-green-400 font-fredoka text-2xl">
                        Aprobado
                      </p>
                      <img
                        src="/confirm.png"
                        alt="Aprobado"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}

                  {selectedStatus === "No Aprobado" && (
                    <div className="flex items-center space-x-3">
                      <p className="text-red-400 font-fredoka text-2xl">
                        No Aprobado
                      </p>
                      <img
                        src="/denied.png"
                        alt="No Aprobado"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Mensaje según estado */}
                <p className="text-white font-fredoka text-lg text-center w-2/3 mb-12">
                  {selectedStatus === "En Revisión" &&
                    `Por favor, aguarda hasta que el propietario de ${selectedCat.name} decida a quién hará entrega del mismo.`}
                  {selectedStatus === "Aprobado" &&
                    `Felicidades! has sido seleccionado para la adopción de ${selectedCat.name}, el propietario se pondrá en contacto contigo.`}
                  {selectedStatus === "No Aprobado" &&
                    `Lo sentimos, el propietario de ${selectedCat.name} ha seleccionado otro postulante para la entrega del mismo.`}
                </p>

                {/* Botón para eliminar la notificación */}
                {selectedCat && selectedStatus && (
                  <NextUIButton
                    color="danger"
                    className="mt-8 font-fredoka text-md bg-opacity-40 p-8"
                    onClick={() =>
                      handleDeleteNotification(
                        selectedCat._id!,
                        selectedStatus!
                      )
                    }
                  >
                    Eliminar Notificación
                  </NextUIButton>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdopterApplications;