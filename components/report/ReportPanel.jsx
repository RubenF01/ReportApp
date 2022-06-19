/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import Arrowleft from "../../public/arrowleft.svg";

const ReportPanel = ({ info, infoPanel, setInfoPanel }) => {
  const year = new Date(info.creationDate).getFullYear().toString();
  const month = new Date(info.creationDate).getMonth() + 1;
  const day = new Date(info.creationDate).getDate().toString();

  return (
    <AnimatePresence>
      {infoPanel ? (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ x: "100%" }}
          className="absolute right-0 top-0 bottom-0 md:w-full lg:w-1/2 bg-white z-[3000]  border-l-[1px] border-black shadow-2xl"
        >
          <div className="h-[30%] relative border-b-[1px] border-black">
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${info.lng},${info.lat}&zoom=13&size=1500x1500&sensor=false&markers=color:red%7C${info.lng},${info.lat}&key=${process.env.GOOGLE_API_KEY}`}
              alt={info.referencias}
              className="h-full w-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-black/30" />
            <button
              onClick={() => setInfoPanel(false)}
              className="flex items-center border-r-[1px] border-t-[1px] border-black px-5 py-2 hover:bg-black hover:fill-white hover:text-white absolute bottom-0 bg-white"
            >
              <Arrowleft className="w-4" />
              Volver
            </button>
          </div>

          <div className="text-center flex flex-col space-y-8 pt-10 cursor-default">
            <div>
              <h1 className="font-bold text-xl">Dirección</h1>
              <p className="text-lg">{info.fullAddress}</p>
            </div>

            <div className="flex justify-around">
              <div>
                <h1 className="font-bold text-xl">Sector</h1>
                <p className="text-lg">{info.sector}</p>
              </div>
              <div>
                <h1 className="font-bold text-xl">Provincia</h1>
                <p className="text-lg">{info.province}</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl">Referencias</h1>
              <p className="text-lg">{info.referencias}</p>
            </div>
            <div>
              <h1 className="font-bold text-xl">Tipo</h1>
              <p className="text-lg">{info.type}</p>
            </div>

            <div>
              <h1 className="font-bold text-xl">Estatus</h1>
              <p className="text-lg">
                {info.status ? "Reparado" : "Sin reparar"}
              </p>
            </div>

            <div>
              <h1 className="font-bold text-xl">Fecha de creación</h1>
              <p className="text-lg">{day + "/" + month + "/" + year}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ReportPanel;
