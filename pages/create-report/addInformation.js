import FormInfo from "../../components/form/FormInfo";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const AddInformation = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, location } = value;
  const { lng, lat } = location;

  if (loggedUser) {
    return (
      <div>
        <FormInfo loggedUser={loggedUser} lng={lng} lat={lat} />
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
