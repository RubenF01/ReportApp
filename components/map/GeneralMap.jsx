/* eslint-disable react-hooks/exhaustive-deps */
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const GeneralMap = ({ allReports }) => {
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [40, 40],
    },
  });

  var customIcon = new LeafIcon({
    iconUrl: "/location-pin-solid.svg",
  });

  return (
    <MapContainer
      center={[18.483402, -69.929611]}
      zoom={12}
      scrollWheelZoom={true}
      className="container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allReports?.map((report, index) => (
        <Marker
          key={index}
          icon={customIcon}
          position={[
            report && report.lng ? report.lng : "",
            report && report.lat ? report.lat : "",
          ]}
          draggable={false}
        >
          <Popup>{report.type}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeneralMap;
