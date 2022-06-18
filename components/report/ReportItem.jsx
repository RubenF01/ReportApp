/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Xmark from "../../public/xmark.svg";
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
    <div className="w-[70%] h-[700px] mx-auto rounded-xl shadow-xl border-[1px] border-black">
      <div className="h-[30%] relative">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`}
          alt={referencias}
          className="h-full w-full object-cover rounded-t-xl"
        />
        <button
          onClick={() => {
            setDeleteMessage(true);
            setDeleteId(_id);
          }}
          className="absolute w-6 right-0 top-0 mr-2 mt-2 z-50 cursor-pointer"
        >
          <Xmark />
        </button>
        <div className="absolute inset-0 bg-black/30 rounded-t-xl" />
      </div>
      {/* <div className="h-[35%] flex overflow-x-auto justify-around border-y-[1px] border-black">
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={referencias}
            className="h-full w-80 object-cover"
          />
        ))}
      </div> */}
      <Carousel
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        className="h-[35%] border-y-[1px] border-black"
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
      <div className="flex justify-around text-center font-poppins py-4">
        <div className="flex flex-col">
          <h1 className="font-bold">Referencias</h1>
          <p>{referencias}</p>
        </div>
        <div>
          <h1 className="font-bold">Tipo</h1>
          <p>{type}</p>
        </div>
      </div>
      <div className="flex flex-col items-center font-poppins space-y-3">
        <div className="text-center">
          <h1 className="font-bold">Estatus</h1>
          <p>{status ? "Reparado" : "Sin reparar"}</p>
        </div>
        <div>
          <h1>Dirección</h1>
          <p>{fullAddress}</p>
        </div>
        <div>
          <h1>Sector</h1>
          <p>{sector}</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">Fecha de creación</h1>
          <p>{day + "/" + month + "/" + year}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
