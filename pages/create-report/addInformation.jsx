import FormInfo from "../../components/form/FormInfo";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useMedia } from "react-use";

const AddInformation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location, address } = value;
  const { lng, lat } = location;
  const isWide = useMedia("(max-width: 1023px)", false);

  if (loggedUser) {
    return (
      <div className="h-screen flex flex-col lg:flex-row items-center relative">
        <div className="w-full lg:w-1/2 relative">
          <img
            className="w-full h-[350px] lg:h-screen object-cover"
            src="/lincoln.jpeg"
            alt="lincoln"
          />

          <div className="bg-black/70 absolute inset-0 flex flex-col items-center justify-center space-y-5">
            {isWide && (
              <h1 className="text-white text-4xl pt-8">Agregue Información</h1>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <FormInfo
            loggedUser={loggedUser}
            lng={lng}
            lat={lat}
            address={address}
          />
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

export default AddInformation;
