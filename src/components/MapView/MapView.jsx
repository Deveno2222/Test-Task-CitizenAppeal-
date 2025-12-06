import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export function MapView({ data}) {
  return (
    <MapContainer
      center={[53.22, 63.62]}
      zoom={13}
      style={{ height: "400px", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude]}

        >
          <Popup>
            {item.category} — {item.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
