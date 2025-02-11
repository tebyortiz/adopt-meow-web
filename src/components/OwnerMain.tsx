import {
  Input,
  Select,
  SelectItem,
  Switch,
  Button as NextUIButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useCats } from "../context/CatContext";
import { CatData } from "../models/CatData";
import Icon from "@mdi/react";
import { mdiGenderMale, mdiGenderFemale } from "@mdi/js";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
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

const OwnerMain = () => {
  const { createCat } = useCats();
  const { user } = useAuth();
  const [image, setImage] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"male" | "female">("male");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [vaccine, setVaccine] = useState<string>("");
  const [care, setCare] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [castrated, setCastrated] = useState<"yes" | "no" | "">("no");
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        const id = await localStorage.getItem("userId");
        if (id) {
          setOwnerId(id);
        }
      } catch (error) {
        console.error("Error al obtener el userId:", error);
      }
    };

    fetchOwnerId();

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

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleAgeChange = (value: string) => {
    const newAge = value.replace(/[^0-9]/g, "");
    if (newAge === "" || (parseInt(newAge) >= 1 && parseInt(newAge) <= 15)) {
      setAge(newAge);
    }
  };

  const handleWeightChange = (itemValue: string) => {
    setSelectedWeight(itemValue);
  };

  const handleVaccineChange = (value: string) => {
    setVaccine(value);
  };

  const handleCareChange = (value: string) => {
    setCare(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleCastratedSelect = (value: "yes" | "no") => {
    setCastrated(value);
  };

  const handlePreviewClick = () => {
    setIsPreviewVisible(true);
  };

  const translateValue = (key: string, value: string) => {
    const translations: Record<string, Record<string, string>> = {
      selectedType: { male: "Macho", female: "Hembra" },
      castrated: { yes: "Sí", no: "No" },
    };

    return translations[key]?.[value] || value;
  };

  const translatedSex = selectedType
    ? translateValue("selectedType", selectedType)
    : "Desconocido";

  const translatedCastrated = translateValue("castrated", castrated);

  const resetForm = () => {
    setImage("");
    setName("");
    setAge("");
    setSelectedWeight("");
    setVaccine("");
    setCare("");
    setDescription("");
    setCastrated("");
    setSelectedType("male");
    setLat(null);
    setLng(null);
  };

  const handleSubmit = async () => {
    if (!ownerId) {
      console.error("No se pudo obtener el userId");
      return;
    }
    if (
      !image ||
      !name ||
      !age ||
      !selectedWeight ||
      !vaccine ||
      !care ||
      !description ||
      !castrated ||
      lat === null ||
      lng === null
    ) {
      alert("Faltan Datos, Por favor complete todos los campos");
      return;
    }

    const newCat: CatData = {
      image,
      name,
      age: parseInt(age),
      weight: selectedWeight,
      vaccinations: vaccine,
      specialCare: care,
      description,
      castrated: castrated || "no",
      sex: selectedType,
      ownerId: ownerId,
      lat,
      lng,
    };

    try {
      await createCat(newCat);
      setIsModalOpen(true);
      resetForm();
      setIsPreviewVisible(false);
    } catch (error) {
      console.error("Error al crear el reporte:", error);
      alert(
        "Error, Hubo un problema al crear el reporte. Inténtalo nuevamente."
      );
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
          className="p-12 h-[85vh] rounded-3xl backdrop-blur-xl mr-4 flex flex-col mb-4"
          style={{
            background:
              "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
          }}
        >
          <div className="py-4 justify-center mb-5 -mt-8">
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
              Por favor, completa la siguiente ficha para postular un gatito
              para su adopción.
            </p>
          </div>

          {/* MichiPerfil */}
          <div className="bg-white bg-opacity-5 w-full rounded-3xl flex-1 flex flex-col p-8">
            <p
              className="text-center mb-4 font-fredoka font-semibold text-2xl text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #e100ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              "MichiPerfil"
            </p>

            <div className="flex flex-col mt-4 mx-4 space-y-6">
              <div className="flex flex-row items-center justify-between">
                <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                  {" "}
                  Nombre
                </p>
                <Input
                  type="text"
                  size="lg"
                  color="secondary"
                  placeholder="Nombre del gatito/a. Máximo 15 carácteres"
                  labelPlacement="outside"
                  variant="bordered"
                  className="mb-0 text-white font-fredoka font-semibold"
                  value={name}
                  maxLength={15}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="flex flex-row items-center justify-between">
                <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                  {" "}
                  Foto
                </p>
                <Input
                  type="url"
                  size="lg"
                  color="secondary"
                  placeholder="https://"
                  labelPlacement="outside"
                  variant="bordered"
                  className="mb-0 text-white font-fredoka font-semibold"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row items-center justify-between">
                  <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                    Edad
                  </p>
                  <Input
                    type="text"
                    size="lg"
                    color="secondary"
                    placeholder="Años"
                    labelPlacement="outside"
                    variant="bordered"
                    className=" mb-0 text-white font-fredoka font-semibold w-2/3 mr-4"
                    value={age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                  />
                </div>

                <div className="w-1/2 flex flex-row items-center justify-between">
                  <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                    Peso
                  </p>
                  <Select
                    size="lg"
                    color="secondary"
                    variant="bordered"
                    selectedKeys={[selectedWeight]}
                    onSelectionChange={(keys) =>
                      handleWeightChange(Array.from(keys)[0] as string)
                    }
                    className="text-white font-fredoka font-semibold w-2/3"
                  >
                    <SelectItem key="Menor a 3 kg" value="Menor a 3 kg">
                      Peso pequeño: Menor a 3 kg
                    </SelectItem>
                    <SelectItem key="3 kg a 5 kg" value="3 kg a 5 kg">
                      Peso Mediano: de 3 kg a 5 kg
                    </SelectItem>
                    <SelectItem key="Mayor a 5 kg" value="Mayor a 5 kg">
                      Peso Grande: Mayor a 5 kg
                    </SelectItem>
                  </Select>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row items-center gap-12">
                  <p className="font-fredoka text-white font-semibold text-xl">
                    Sexo
                  </p>

                  <div className="flex items-center gap-2">
                    <Switch
                      isSelected={selectedType === "female"}
                      onChange={() =>
                        setSelectedType(
                          selectedType === "male" ? "female" : "male"
                        )
                      }
                      color="secondary"
                    />
                    <p className="font-fredoka text-white text-lg flex items-center gap-1">
                      <Icon
                        path={
                          selectedType === "male"
                            ? mdiGenderMale
                            : mdiGenderFemale
                        }
                        size={1}
                        className="text-white"
                      />
                      {selectedType === "male" ? "Macho" : "Hembra"}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex flex-row items-center gap-12">
                  <p className="font-fredoka text-white font-semibold text-xl">
                    Castrado/a?
                  </p>

                  <div className="flex items-center gap-2">
                    <Switch
                      isSelected={castrated === "yes"}
                      onChange={() =>
                        handleCastratedSelect(
                          castrated === "yes" ? "no" : "yes"
                        )
                      }
                      color="secondary"
                    />

                    <p className="font-fredoka text-white text-lg flex items-center gap-1">
                      {castrated === "yes" ? "Sí" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                  Vacunas
                </p>
                <Input
                  type="text"
                  size="lg"
                  color="secondary"
                  placeholder="Escríbelas separadas por , Máx. 50 carácteres"
                  labelPlacement="outside"
                  variant="bordered"
                  className="mb-0 text-white font-fredoka font-semibold"
                  value={vaccine}
                  maxLength={50}
                  onChange={(e) => handleVaccineChange(e.target.value)}
                />
              </div>

              <div className="flex flex-row items-center justify-between">
                <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                  Cuidados Especiales
                </p>
                <Input
                  type="text"
                  size="lg"
                  color="secondary"
                  placeholder="¿de qué se debe cuidar al gatito? Máx. 200 carácteres"
                  labelPlacement="outside"
                  variant="bordered"
                  className="mb-0 text-white font-fredoka font-semibold"
                  value={care}
                  maxLength={200}
                  onChange={(e) => handleCareChange(e.target.value)}
                />
              </div>

              <div className="flex flex-row items-center justify-between">
                <p className="font-fredoka text-white font-semibold text-xl w-1/3">
                  Descripción
                </p>
                <Input
                  type="text"
                  size="lg"
                  color="secondary"
                  placeholder="¿cómo es el gatito? Máx. 200 carácteres"
                  labelPlacement="outside"
                  variant="bordered"
                  className="mb-0 text-white font-fredoka font-semibold"
                  value={description}
                  maxLength={200}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botón Vista Lateral */}
        <NextUIButton
          onPress={handlePreviewClick}
          color="secondary"
          href="#"
          radius="lg"
          className="p-8 mr-4"
          style={{
            background:
              "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
          }}
        >
          <div className="flex items-center justify-center font-fredoka text-xl gap-4">
            Visualizar Michiperfil
            <img
              src={"/search-icon.png"}
              alt="Escudo"
              className="h-10 w-auto"
            />
          </div>
        </NextUIButton>
      </motion.div>

      {/* Previsualización del MichiPerfil */}
      {isPreviewVisible && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={cardVariant}
          className="flex flex-col w-1/2 space-y-4"
        >
          <div
            className="p-4 h-[85vh] rounded-3xl backdrop-blur-xl ml-4 flex flex-col"
            style={{
              background:
                "linear-gradient(to top, rgba(75, 0, 130, 0.2), rgba(128, 0, 128, 0.2), rgba(167, 105, 151, 0.29))",
            }}
          >
            <div
              className="flex flex-row items-center rounded-2xl mx-16 border-2 mt-4 border-white border-opacity-40"
              style={{
                background:
                  "linear-gradient(to left, rgba(75, 0, 130, 0.3), rgba(128, 0, 128, 0.3), rgba(167, 105, 151, 0.6))",
              }}
            >
              <img src={"/medal.png"} alt="Escudo" className="h-20 w-auto" />
              <p className="text-white font-fredoka text-2xl">
                Michiperfil de {name}
              </p>
            </div>
            <div className=" p-4 bg-[#f1f1f4] rounded-2xl h-auto space-y-4 mt-4 mx-16">
              <div className="flex flex-row items-end gap-2">
                <img
                  src={image}
                  alt="Foto"
                  className="rounded-full h-32 w-32 border-3 border-secondary border-opacity-40 shadow-lg object-cover"
                />
                <div className="flex flex-col space-y-2 self-end">
                  <div className="flex flex-row gap-2">
                    <p
                      className={`text-white rounded-full p-2 font-fredoka text-md ${
                        translatedSex === "Hembra"
                          ? "bg-[#fdb4cb]"
                          : "bg-[#81bceb]"
                      }`}
                    >
                      {translatedSex}
                    </p>
                    <p className="text-[#626262] bg-white rounded-full p-2 font-fredoka text-md">
                      Edad: {age} {age === "1" ? "año" : "años"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#626262] bg-white rounded-full p-2 font-fredoka text-md">
                      Peso: {selectedWeight}
                    </p>
                    <p className="text-[#626262] bg-white rounded-full p-2 font-fredoka text-md">
                      Castrado/a?:
                    </p>
                    <p
                      className={`text-white rounded-full p-2  font-fredoka text-md ${
                        translatedCastrated === "Sí"
                          ? "bg-[#d0e6a5] px-4"
                          : "bg-[#ff6d6d] px-3"
                      }`}
                    >
                      {translatedCastrated}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white rounded-2xl p-2">
                <p className="text-secondary text-opacity-60 font-fredoka text-xl mb-1">
                  Descripción:
                </p>
                <p className="text-[#626262] font-fredoka text-md">
                  {description}
                </p>
              </div>
              <div className="flex flex-col bg-white rounded-2xl p-2">
                <p className="text-secondary text-opacity-60 font-fredoka text-xl mb-1">
                  Cuidados Especiales:
                </p>
                <p className="text-[#626262] font-fredoka text-md">{care}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="bg-[#fff78c] w-1/2 rounded-xl p-2">
                  <div className="flex flex-row">
                    <div className="flex flex-col mr-2">
                      <p className="text-primary font-fredoka text-md">
                        Vacunas:
                      </p>
                      <img
                        src={"/shield.png"}
                        alt="Escudo"
                        className="h-16 w-auto"
                      />
                    </div>

                    <div className="flex flex-col text-[#626262] font-fredoka text-md space-y-1">
                      {vaccine.split(",").map((vacuna, index) => (
                        <p key={index}>{vacuna.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DATOS DE getUserById */}

                <div className="bg-secondary bg-opacity-60 w-1/2 rounded-xl p-2">
                  <div className="flex flex-col space-y-2">
                    <p className="text-white font-fredoka text-md">
                      Ofrecido/a por:
                    </p>
                    <div className="flex flex-row gap-2">
                      <img
                        src={user?.image}
                        alt="Dueño"
                        className="rounded-full h-12 w-12 border-2 border-whitey shadow-xl object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-white font-fredoka text-md">
                          {user?.username}
                        </p>
                        <p className="text-white font-fredoka text-sm">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón para aplicar a la postulación */}
          <NextUIButton
            onPress={handleSubmit}
            color="secondary"
            href="#"
            radius="lg"
            className="p-8 ml-4"
            style={{
              background:
                "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
            }}
          >
            <div className="flex items-center justify-center font-fredoka text-xl gap-4">
              Publicar la Adopción de {name}
              <img
                src={"/plus-blue.png"}
                alt="Escudo"
                className="h-10 w-auto"
              />
            </div>
          </NextUIButton>
        </motion.div>
      )}

      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        backdrop="opaque"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col items-center justify-center gap-2">
            <img
              src="/confirm-label.png"
              alt="Confirmación"
              className="w-16 h-16"
            />
            <h2 className="text-secondary font-fredoka text-lg text-center">
              Postulación Exitosa
            </h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-[#626262] font-fredoka text-lg text-center">
              Tu Postulación ha sido enviada con éxito. Ahora será visible para
              todos los usuarios.
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

export default OwnerMain;
