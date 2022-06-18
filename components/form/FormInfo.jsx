import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FormInfo = ({ loggedUser, lng, lat, address }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [type, setType] = useState("Bache");
  const [fullAddress, setFullAddress] = useState("");
  const [sector, setSector] = useState("");
  const [province, setProvince] = useState("");
  const { cedula } = loggedUser;
  const defaultStatus = false;
  const router = useRouter();

  useEffect(() => {
    setSector(
      address.address_components?.filter((component) =>
        component.types.includes("sublocality")
      )[0].long_name
    );
    setProvince(
      address.address_components?.filter((component) =>
        component.types.includes("administrative_area_level_1")
      )[0].long_name
    );
    setFullAddress(address.formatted_address);
  });

  console.log(fullAddress);

  const onSubmit = async (formData) => {
    try {
      const { referencias, imagenes } = formData;
      let imageLinks = [];

      const date = Date.now();
      const imageData = new FormData();

      // Upload images to Cloudinary
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

      // Create report
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
          fullAddress,
          sector,
          province,
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
      <select
        className="border-[1px] border-black"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Bache">Bache</option>
        <option value="Cable en el suelo">Cable en el suelo</option>
        <option value="Espacio ilegalmente ocupado">
          Espacio ilegalmente ocupado
        </option>
        <option value="Otro">Otro</option>
      </select>

      <div>
        <h1>Dirección seleccionada</h1>
        <p>{fullAddress}</p>
      </div>

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
