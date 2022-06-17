import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const FormInfo = ({ loggedUser, lng, lat }) => {
  const [type, setType] = useState("Bache");
  const { cedula } = loggedUser;
  const defaultStatus = false;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { referencias, imagenes } = formData;
      let imageLinks = [];

      const date = Date.now();
      const imageData = new FormData();

      for (const imagen of imagenes) {
        imageData.append("file", imagen);
        imageData.append("upload_preset", "my-uploads");

        const data = await fetch(process.env.IMG_UPLOAD_LINK, {
          method: "POST",
          body: imageData,
        }).then((res) => res.json());

        imageData = new FormData();

        imageLinks.push(data.secure_url);
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/reporte",
        {
          cedula,
          referencias,
          imageLinks,
          lng,
          lat,
          defaultStatus,
          date,
          type,
        },
        config
      );

      reset();

      router.push("/userDashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white absolute left-0 right-0 mx-auto w-[30rem] flex flex-col rounded-2xl shadow-md space-y-3 px-10 py-5 font-poppins"
    >
      <h1 className="font-bold text-center underline text-2xl">
        Agregue Informacion
      </h1>
      <label className="font-bold">Referencias</label>
      <input
        type="text"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("referencias", { required: true })}
      />

      <label className="font-bold">Fotos del incidente y referencias</label>
      <input
        type="file"
        multiple={true}
        className="bg-slate-300 rounded py-2 px-3"
        {...register("imagenes", { required: true })}
      />

      <label className="font-bold">Tipo</label>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="Bache">Bache</option>
        <option value="Cable en el suelo">Cable en el suelo</option>
        <option value="Espacio ilegalmente ocupado">
          Espacio ilegalmente ocupado
        </option>
        <option value="Otro">Otro</option>
      </select>

      <div className="flex justify-center">
        <button
          type="submit"
          className="border-[1px] border-black hover:bg-black hover:text-white w-max px-5 py-1 cursor-pointer"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormInfo;
