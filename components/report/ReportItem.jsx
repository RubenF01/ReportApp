/* eslint-disable @next/next/no-img-element */
import Xmark from "../../public/xmark.svg";

const ReportItem = ({
  report: { lat, lng, referencias, status, creationDate, imagenes },
}) => {
  return (
    <div className="w-[80%] h-[700px] mx-auto bg-orange-300 rounded-xl">
      <div className="h-[40%] relative">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${lng},${lat}&key=${process.env.GOOGLE_API_KEY}`}
          alt={referencias}
          className="h-full w-full object-cover rounded-t-xl"
        />
        <Xmark className="absolute w-6 right-0 top-0 mr-2 mt-2" />
      </div>
      <div className="bg-red-400 h-[30%] flex overflow-x-auto space-x-3 justify-around">
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={referencias}
            className="h-full w-80 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ReportItem;
