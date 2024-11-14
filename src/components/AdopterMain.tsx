import { Button as NextUIButton } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdopterMain = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/Login");
  };

  return (
    <div className="m-auto justify-center items-center">
      <NextUIButton
        onPress={handleLogout}
        color="secondary"
        href="#"
        radius="lg"
        className="text-white text-2xl w-2/6 font-semibold m-auto font-fredoka p-8"
        style={{
          background:
            "linear-gradient(to right, rgba(225, 0, 255, 0.4), rgba(127, 0, 255, 0.4))",
        }}
      >
        <div className="flex items-center justify-center text-3xl">Salir</div>
      </NextUIButton>
    </div>
  );
};

export default AdopterMain;
