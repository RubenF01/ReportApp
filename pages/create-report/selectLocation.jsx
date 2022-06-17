import dynamic from "next/dynamic";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Link from "next/link";

const ReportMap = dynamic(() => import("../../components/map/ReportMap"), {
  ssr: false,
});

const SelectLocation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location, setLocation } = value;

  if (loggedUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <div className="md:max-w-[1280px] w-full font-bold font-poppins">
          <h1>Seleccione la localizacion</h1>
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
        <div>
          <Link href="/create-report/addInformation">
            <a className="border-2 border-black text-xl px-3 rounded-xl font-poppins">
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
