import axios from "axios";

const UserBanner = ({ firstName, lastName, isAdmin, cedula, creationDate }) => {
  const date = new Date(creationDate);

  const updateType = async (e) => {
    await axios.patch("/api/updateUserType", {
      cedula,
      userType: e.target.value,
    });
  };

  return (
    <div className="w-full h-10 border-[1px] border-black flex justify-between items-center px-3 bg-slate-500">
      <h1 className="font-bold cursor-default">
        {firstName} {lastName}
      </h1>
      <div className="flex items-center space-x-4">
        <p className="cursor-default">{cedula}</p>
        <p className="cursor-default">{date.toLocaleDateString("es-DO")}</p>
        <select
          className="border-[1px] border-black px-2"
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
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};

export default UserBanner;
