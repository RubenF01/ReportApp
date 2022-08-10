/* eslint-disable @next/next/no-img-element */

const ReportBanner = ({
  lng,
  lat,
  references,
  fullAddress,
  _id,
  creationDate,
  type,
  status,
  createdBy,
  setInfo,
  setInfoPanel,
  sector,
  province,
  user,
}) => {
  const date = new Date(creationDate);

  return (
    <div className="w-full h-64 border-[1px] border-black rounded flex relative">
      <div className="w-[500px] border-r-[1px] border-black relative">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=16&size=400x300&sensor=false&markers=color:red%7C${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`}
          alt={references}
          className="object-cover w-full h-full rounded-l"
        />
        <div className="absolute top-0 px-3 py-2 bg-blue-400 rounded">
          <h1>{date.toLocaleDateString("es-DO")}</h1>
        </div>
      </div>
      <div className="pt-3 pl-4 space-y-4 w-[750px] flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold">Dirección:</h1>
          <p>{fullAddress}</p>
        </div>
        <h1 className="font-bold">
          Creado por: <span className="font-normal">{createdBy}</span>
        </h1>
        <h1 className="font-bold">
          Tipo: <span className="font-normal">{type}</span>
        </h1>
        <h1 className="font-bold">
          Estatus:{" "}
          <span
            className={`font-normal ${
              status ? "text-green-600" : "text-red-600"
            }`}
          >
            {status ? "REPARADO" : "SIN REPARAR"}
          </span>
        </h1>
        <button
          type="button"
          className="border-[1px] border-black hover:text-white hover:bg-black px-3 py-2"
          onClick={() => {
            setInfo({
              creationDate,
              references,
              sector,
              province,
              type,
              lat,
              lng,
              fullAddress,
              status,
              _id,
              user,
            });
            setInfoPanel(true);
          }}
        >
          MÁS INFORMACIÓN
        </button>
      </div>
    </div>
  );
};

export default ReportBanner;
