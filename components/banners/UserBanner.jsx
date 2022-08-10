import axios from "axios";

const UserBanner = ({
  _id,
  firstName,
  lastName,
  isAdmin,
  cedula,
  creationDate,
  setIsOpen,
  setUserToDelete,
}) => {
  const date = new Date(creationDate);

  const updateType = async (e) => {
    try {
      await axios.patch("/api/updateUserType", {
        cedula,
        userType: e.target.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-10 border-[1px] border-black flex justify-between items-center px-3 bg-gray-200 rounded">
      <h1 className="font-bold cursor-default">
        {firstName} {lastName}
      </h1>
      <div className="flex items-center space-x-4">
        <p className="cursor-default">{cedula}</p>
        <p className="cursor-default">{date.toLocaleDateString("es-DO")}</p>
        <select
          className="border-[1px] border-black px-2 outline-none"
          onChange={updateType}
        >
          {isAdmin ? (
            <option value="true">Admin</option>
          ) : (
            <option value="false">User</option>
          )}
          {isAdmin ? (
            <option value="false">User</option>
          ) : (
            <option value="true">Admin</option>
          )}
        </select>
        <button
          className="text-white bg-red-500 border-[1px] border-black px-2"
          type="button"
          onClick={() => {
            setIsOpen(true);
            setUserToDelete(_id);
          }}
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};

export default UserBanner;
