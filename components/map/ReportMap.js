/* eslint-disable react-hooks/exhaustive-deps */
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef, useMemo } from "react";

const ReportMap = ({ center, draggable, onDragMarker, location }) => {
  const markerRef = useRef(null);

  const dragHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        onDragMarker(marker.getLatLng());
      }
    },
  }));

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
      center={[center.lng, center.lat]}
      zoom={13}
      scrollWheelZoom={false}
      className="container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={customIcon}
        position={[
          location && location.lng ? location.lng : "",
          location && location.lat ? location.lat : "",
        ]}
        draggable={draggable}
        eventHandlers={dragHandlers}
        ref={markerRef}
      ></Marker>
    </MapContainer>
  );
};

export default ReportMap;
