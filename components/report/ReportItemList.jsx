/* eslint-disable @next/next/no-img-element */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ReportItemList = ({
  report: {
    lat,
    lng,
    references,
    status,
    creationDate,
    images,
    type,
    _id,
    sector,
    province,
    fullAddress,
  },
  setDeleteMessage,
  setDeleteId,
  setInfo,
  setInfoPanel,
}) => {
  const year = new Date(creationDate).getFullYear().toString();
  const month = new Date(creationDate).getMonth() + 1;
  const day = new Date(creationDate).getDate().toString();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="border-[1px] border-black h-72 flex w-[80%]">
      <div className="w-[30%]">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`}
          alt={references}
          className="object-cover w-full h-full"
        />
      </div>
      <Carousel
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        className="w-[40%] h-full border-y-[1px] border-black"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={references}
            className="object-contain w-full h-full mx-auto"
          />
        ))}
      </Carousel>
      <div className="w-[30%] h-full flex flex-col justify-center items-center space-y-4">
        <div className="pt-3 text-center cursor-default">
          <h1 className="font-bold">Fecha de creación</h1>
          <p>{day + "/" + month + "/" + year}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setInfo({
                lat,
                lng,
                references,
                status,
                creationDate,
                images,
                type,
                _id,
                sector,
                province,
                fullAddress,
              });
              setInfoPanel(true);
            }}
            className="border-[1px] border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            MÁS INFORMACIÓN
          </button>
          <button
            onClick={() => {
              setDeleteMessage(true);
              setDeleteId(_id);
            }}
            className="border-[1px] border-black px-3 py-1 hover:bg-red-700 hover:text-white"
          >
            ELIMINAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportItemList;
