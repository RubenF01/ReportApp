import Carousel from "../components/carousel/Carousel";
import CarouselItem from "../components/carousel/CarouselItem";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReportMap = dynamic(() => import("../components/map/ReportMap"), {
  ssr: false,
});

const CreateReport = () => {
  const [location, setLocation] = useState({ lng: 18.50012, lat: -69.98857 });

  return (
    <div>
      <Carousel>
        <CarouselItem>
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
        </CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
      </Carousel>
    </div>
  );
};

export default CreateReport;
