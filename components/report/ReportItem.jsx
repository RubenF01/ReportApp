/* eslint-disable @next/next/no-img-element */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ReportItem = ({
  report: {
    lat,
    lng,
    referencias,
    status,
    creationDate,
    imagenes,
    type,
    _id,
    sector,
    province,
    fullAddress,
  },
  getReports,
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
    <div className="w-[70%] h-[450px] mx-auto shadow-xl border-[1px] border-black">
      <div className="h-[30%] relative">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`}
          alt={referencias}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Carousel
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        className="h-[45%] border-y-[1px] border-black"
      >
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={referencias}
            className="mx-auto w-full h-full object-contain"
          />
        ))}
      </Carousel>

      <div className="text-center pt-3 cursor-default">
        <h1 className="font-bold">Fecha de creación</h1>
        <p>{day + "/" + month + "/" + year}</p>
      </div>

      <div className="flex justify-center py-2 space-x-4">
        <button
          onClick={() => {
            setInfo({
              lat,
              lng,
              referencias,
              status,
              creationDate,
              imagenes,
              type,
              _id,
              sector,
              province,
              fullAddress,
            });
            setInfoPanel(true);
          }}
          className="border-[1px] border-black px-3 hover:bg-black hover:text-white"
        >
          MÁS INFORMACIÓN
        </button>
        <button
          onClick={() => {
            setDeleteMessage(true);
            setDeleteId(_id);
          }}
          className="border-[1px] border-black px-3 hover:bg-red-700 hover:text-white"
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};

export default ReportItem;
