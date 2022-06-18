import FormInfo from "../../components/form/FormInfo";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const AddInformation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location, address } = value;
  const { lng, lat } = location;

  if (loggedUser) {
    return (
      <div className="h-screen flex items-center">
        <FormInfo
          loggedUser={loggedUser}
          lng={lng}
          lat={lat}
          address={address}
        />
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
