import Carousel from "../components/carousel/Carousel";
import CarouselItem from "../components/carousel/CarouselItem";
import ReportMap from "../components/map/ReportMap";

const CreateReport = () => {
  return (
    <div>
      <Carousel>
        <CarouselItem>
          <ReportMap />
        </CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
      </Carousel>
    </div>
  );
};

export default CreateReport;
