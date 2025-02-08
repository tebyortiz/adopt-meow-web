import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CatData } from "../models/CatData";
import { Avatar } from "@nextui-org/react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1.1rem",
};

interface GoogleMapProps {
  userLat: number;
  userLng: number;
  cats: CatData[];
  onCatClick: (cat: CatData) => void;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  userLat,
  userLng,
  cats,
  onCatClick,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSd0sJy7AR6CZx_-0Yh-GnEE8ERHFUDEM",
  });

  if (!isLoaded) {
    return <p className="text-white text-center">Cargando mapa...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: userLat, lng: userLng }}
      zoom={14}
    >
      {/* Marker del usuario */}
      <Marker position={{ lat: userLat, lng: userLng }} label="Tú" />

      {/* Avatares de los gatos filtrados con desplazamiento */}
      {cats.map((cat, index) => {
        const offset = (index + 1) * 0.0002;
        return (
          <OverlayView
            key={cat._id}
            position={{ lat: cat.lat + offset, lng: cat.lng + offset }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="relative">
              <Avatar
                src={cat.image}
                size="lg"
                className="border-2 border-white shadow-lg cursor-pointer"
                onClick={() => onCatClick(cat)}
              />
            </div>
          </OverlayView>
        );
      })}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
