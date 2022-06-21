import dynamic from "next/dynamic";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Link from "next/link";

const ReportMap = dynamic(() => import("../../components/map/ReportMap"), {
  ssr: false,
});

const SelectLocation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location, setLocation, setAddress } = value;

  const fetchAddress = async () => {
    const { lng, lat } = location;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await response.json();
    setAddress(data.results[0]);
  };

  if (loggedUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <div className="max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] w-full font-bold font-poppins pt-14 pb-4 lg:pt-0 lg:pb-0">
          <h1 className="text-2xl">Seleccione la localización</h1>
        </div>
        <ReportMap
          center={location}
          location={location}
          draggable={true}
          onDragMarker={(e) => {
            let loc = { lat: e.lng, lng: e.lat };
            setLocation(loc);
          }}
        />
        <div className="pt-5">
          <Link href="/create-report/add-information">
            <a
              onClick={fetchAddress}
              className="border-2 border-black text-xl px-5 py-2 font-poppins hover:text-white hover:bg-black"
            >
              Continuar
            </a>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <h1 className="text-4xl font-bold font-poppins">
          ¡USUARIO NO AUTORIZADO!
        </h1>
      </div>
    );
  }
};

export default SelectLocation;
