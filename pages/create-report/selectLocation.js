import dynamic from "next/dynamic";
import { useState } from "react";

const ReportMap = dynamic(() => import("../../components/map/ReportMap"), {
  ssr: false,
});

const SelectLocation = () => {
  const [location, setLocation] = useState({ lng: 18.50012, lat: -69.98857 });

  return (
    <div className="flex justify-center items-center h-screen">
      <ReportMap
        center={location}
        location={location}
        draggable={true}
        title="sample text"
        onDragMarker={(e) => {
          console.log("e", e);
          let loc = { lat: e.lng, lng: e.lat };
          setLocation(loc);
        }}
      />
    </div>
  );
};

export default SelectLocation;
