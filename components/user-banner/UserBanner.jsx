const UserBanner = ({ firstName, lastName, isAdmin, cedula, creationDate }) => {
  return (
    <div className="w-full h-10 border-[1px] border-black flex justify-between items-center px-3 bg-slate-500">
      <h1 className="font-bold cursor-default">
        {firstName} {lastName}
      </h1>
      <div className="flex items-center space-x-4">
        <p className="cursor-default">{cedula}</p>
        <p className="cursor-default">8/6/2022</p>
        <select className="border-[1px] border-black px-2">
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
          DELETE
        </button>
      </div>
    </div>
  );
};

export default UserBanner;
