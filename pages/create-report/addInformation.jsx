import FormInfo from "../../components/form/FormInfo";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const AddInformation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location, address } = value;
  const { lng, lat } = location;

  if (loggedUser) {
    return (
      <div className="h-screen flex items-center relative">
        <div className="w-1/2 relative">
          <img
            className="w-full h-screen object-cover"
            src="/lincoln.jpeg"
            alt="lincoln"
          />

          <div className="bg-black/70 absolute inset-0 flex flex-col items-center justify-center space-y-5" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
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
