import { useEffect, useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import { useCats } from "../context/CatContext";
import { CatData } from "../models/CatData";
import { Button as NextUIButton } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { UserRegistrationData } from "../models/UserRegistrationData";

const AdopterMain = () => {
  const { getCats, applyAdoption, cats } = useCats();
  const { getUserById } = useAuth();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [filteredCats, setFilteredCats] = useState<CatData[]>([]);
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [ownerData, setOwnerData] = useState<UserRegistrationData | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const translateValue = (key: string, value: string) => {
    const translations: Record<string, Record<string, string>> = {
      selectedType: { male: "Macho", female: "Hembra" },
      castrated: { yes: "Sí", no: "No" },
    };

    return translations[key]?.[value] || value;
  };

  const handlePreviewClick = (cat: CatData) => {
    console.log("Gatito seleccionado:", cat);
    setSelectedCat(cat);
    setIsPreviewVisible(true);
  
    // Ejecutar fetchOwnerData inmediatamente después de actualizar el estado
    setTimeout(() => {
      if (cat.ownerId) {
        getUserById(cat.ownerId).then((owner) => {
          console.log("Dueño cargado en handlePreviewClick:", owner);
          setOwnerData(owner || null);
        });
      }
    }, 0);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no está disponible en este navegador.");
    }
  }, []);

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
    const fetchOwnerData = async () => {
      if (selectedCat?.ownerId) {
        console.log("Obteniendo datos del dueño con ID:", selectedCat.ownerId);
        try {
          const owner = await getUserById(selectedCat.ownerId);
          console.log("Datos del dueño recibidos:", owner);
          setOwnerData(owner || null);
        } catch (error) {
          console.error("Error fetching owner data:", error);
        }
      } else {
        console.log("No hay ownerId en selectedCat");
        setOwnerData(null);
      }
    };
  
    fetchOwnerData();
  }, [selectedCat]);  

  const handleAdopt = async () => {
    const adopterId = await localStorage.getItem("userId");
    const catId = selectedCat?._id;

    if (catId && adopterId) {
      await applyAdoption(catId, adopterId);
      alert("¡Éxito! Se aplicó la postulación correctamente.");
      setIsPreviewVisible(false);
    } else {
      console.error("El ID del gatito o del adoptante no está definido");
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
          <div className="py-4 justify-center mb-2 -mt-8">
            <p
              className="mb-2 font-fredoka text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bienvenido/a.
            </p>
            <p className="text-white font-fredoka text-md">
              En el mapa encontrarás gatitos cercanos a tu ubicación.
            </p>
            <p className="text-white font-fredoka text-md">
              Selecciona un gatito para ver su Michiperfil.
            </p>
          </div>

          {/* Mapa */}
          <div className="bg-white bg-opacity-5 w-full rounded-3xl flex-1 flex flex-col p-8">
            {lat !== null && lng !== null ? (
              <GoogleMapComponent
                userLat={lat}
                userLng={lng}
                cats={filteredCats}
                onCatClick={handlePreviewClick}
              />
            ) : (
              <p className="text-white text-center">Cargando mapa...</p>
            )}
          </div>
        </div>
      </div>

      {/* MichiPerfil */}
      {isPreviewVisible && selectedCat && (
        <div className="flex flex-col w-1/2 space-y-4">
          <div
            className="p-4 h-[85vh] rounded-3xl backdrop-blur-xl ml-4 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
            }}
          >
            <div className="p-4 bg-white bg-opacity-5 rounded-3xl h-auto space-y-4 mt-8 mx-16">
              <img
                src={selectedCat.image}
                alt="Foto"
                className="rounded-full h-36 w-36 border-2 border-white shadow-lg object-cover m-auto"
              />
              <div className="p-4 bg-white bg-opacity-5 rounded-3xl mx-16 space-y-2 ">
                <p className="text-white font-fredoka text-md">
                  Nombre: {selectedCat.name}
                </p>
                <p className="text-white font-fredoka text-md">
                  Edad: {selectedCat.age}
                </p>
                <p className="text-white font-fredoka text-md">
                  Peso: {selectedCat.weight}
                </p>
                <p className="text-white font-fredoka text-md">
                  Sexo: {translateValue("selectedType", selectedCat.sex)}
                </p>
                <p className="text-white font-fredoka text-md">
                  Castrado/a?:{" "}
                  {translateValue("castrated", selectedCat.castrated)}
                </p>
                <p className="text-white font-fredoka text-md">
                  Vacunas: {selectedCat.vaccinations}
                </p>
                <p className="text-white font-fredoka text-md">
                  Cuidados Especiales: {selectedCat.specialCare}
                </p>
                <p className="text-white font-fredoka text-md">
                  Descripción: {selectedCat.description}
                </p>
              </div>

              {/* DATOS DE getUserById */}
              {ownerData && (
                <div className="flex flex-col bg-white bg-opacity-5 rounded-3xl p-4 mx-16 space-y-2">
                  <p className="text-white font-fredoka text-md">
                    Postulado por:
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={ownerData.image}
                      alt="Dueño"
                      className="rounded-full h-16 w-16 border-2 border-white shadow-lg object-cover"
                    />
                    <p className="text-white font-fredoka text-md">
                      {ownerData.username}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Texto alineado en la parte inferior */}
            <div className="mx-8 text-center mt-auto">
              <p className="text-white font-fredoka font-light text-md">
                Si deseas adoptar a {selectedCat.name}, te pedimos total
                responsabilidad para su adopción, respetando sus cuidados
                especiales, y brindándole mucho amor!
              </p>
            </div>
          </div>

          {/* Botón para aplicar a la postulación */}
          <NextUIButton
            onPress={handleAdopt}
            color="secondary"
            href="#"
            radius="lg"
            className="p-8 ml-4"
            style={{
              background:
                "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
            }}
          >
            <div className="flex items-center justify-center font-fredoka text-xl">
              Postular para la Adopción de {selectedCat.name}
            </div>
          </NextUIButton>
        </div>
      )}
    </div>
  );
};

export default AdopterMain;
