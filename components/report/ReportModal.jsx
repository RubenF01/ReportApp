/* eslint-disable @next/next/no-img-element */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const ReportModal = ({ info, infoPanel, setInfoPanel, setInfo }) => {
  const [userPanel, setUserPanel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(info.creationDate);
  const user = info.user ? info.user[0] : [];
  const userCreationDate = new Date(user.creationDate);

  const updateStatus = async (e) => {
    try {
      await axios.patch("/api/updateReportStatus", {
        id: info._id,
        status: e.target.value,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReport = async () => {
    try {
      await axios.delete("/api/deleteReport", {
        params: {
          id: info._id,
        },
      });
      setInfoPanel(false);
      setInfo({});
      setIsOpen(false);
      setUserPanel(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className={`fixed inset-0 flex items-center justify-center z-[2500] ${
          infoPanel ? "" : "hidden"
        }`}
      >
        <div className="h-[700px] w-[900px] z-[2500] rounded border-[1px] bg-white border-black">
          <div className="w-full h-[300px] border-b-[1px] border-black">
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${info.lng},${info.lat}&zoom=15&size=1500x1500&sensor=false&markers=color:red%7C${info.lng},${info.lat}&key=${process.env.GOOGLE_API_KEY}`}
              alt={info.references}
              className="object-cover w-full h-full rounded-t"
            />
          </div>
          <div className="relative flex flex-col pt-2 gap-y-3">
            <div className="text-center">
              <h1 className="font-bold">Dirección:</h1>
              <p>{info.fullAddress}</p>
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <h1 className="font-bold">Provincia:</h1>
                <p>{info.province}</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold">Sector:</h1>
                <p>{info.sector}</p>
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-bold">Referencias:</h1>
              <p>{info.references}</p>
            </div>

            <div className="flex justify-around">
              <div className="text-center">
                <h1 className="font-bold">Tipo:</h1>
                <p>{info.type}</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold">Fecha de creación:</h1>
                <p>{date.toLocaleDateString("es-DO")}</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="pb-2 font-bold">Estatus:</h1>
              <select
                onChange={updateStatus}
                className="border-[1px] border-black outline-none"
              >
                {info.status ? (
                  <option value="true">Reparado</option>
                ) : (
                  <option value="false">Sin Reparar</option>
                )}
                {info.status ? (
                  <option value="false">Sin Reparar</option>
                ) : (
                  <option value="true">Reparado</option>
                )}
              </select>
            </div>

            <div className="flex justify-center pt-4 space-x-4">
              <button
                onClick={() => {
                  setInfoPanel(false);
                  setInfo({});
                  setUserPanel(false);
                }}
                className="border-[1px] border-black px-3 py-1 hover:bg-black hover:text-white"
              >
                CERRAR
              </button>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="border-[1px] border-black px-3 py-1 hover:text-white hover:bg-red-500"
              >
                ELIMINAR
              </button>
              <button
                onClick={() => {
                  setUserPanel(true);
                }}
                className="border-[1px] border-black px-3 py-1 hover:bg-black hover:text-white"
              >
                INFO USUARIO
              </button>
            </div>

            {/* USER PANEL */}
            <div
              className={`absolute top-0 right-0 w-1/2 bg-gray-200 h-[398px] border-l-[1px] border-black ${
                userPanel ? "" : "hidden"
              }`}
            >
              <button
                onClick={() => {
                  setUserPanel(false);
                }}
                className="absolute top-0 left-0 border-r-[1px] border-b-[1px] border-black px-3 py-1 bg-red-600 text-white"
              >
                CERRAR
              </button>
              <h1 className="pt-10 font-bold text-center underline">
                INFORMACIÓN USUARIO
              </h1>
              <div className="pt-10 pl-6 space-y-5">
                <h1 className="font-bold">
                  Nombre:{" "}
                  <span className="font-normal">
                    {user.firstName} {user.lastName}
                  </span>
                </h1>
                <h1 className="font-bold">
                  Cedula: <span className="font-normal">{user.cedula}</span>
                </h1>
                <h1 className="font-bold">
                  Correo: <span className="font-normal">{user.email}</span>
                </h1>
                <h1 className="font-bold">
                  Fecha de creación:{" "}
                  <span className="font-normal">
                    {userCreationDate.toLocaleDateString("es-DO")}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* DELETE CONFIRMATION */}
        <div
          className={`fixed inset-0 flex justify-center items-center z-[2500] ${
            isOpen ? "" : "hidden"
          }`}
        >
          <div className="bg-white border-[1px] border-black py-10 px-10 space-y-4 z-[2500]">
            <h1 className="text-center cursor-default">¿Estás seguro?</h1>
            <div className="flex space-x-5">
              <button
                onClick={deleteReport}
                className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-black"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportModal;
