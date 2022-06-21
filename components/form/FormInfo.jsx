/* eslint-disable react-hooks/exhaustive-deps */
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
      address?.address_components
        ? address?.address_components?.filter((component) =>
            component.types.includes("sublocality")
          )[0]?.long_name
        : ""
    );
    setProvince(
      address?.address_components
        ? address?.address_components?.filter((component) =>
            component.types.includes("administrative_area_level_1")
          )[0]?.long_name
        : ""
    );
    setFullAddress(address.formatted_address);
  });

  const onSubmit = async (formData) => {
    try {
      const { references, images } = formData;
      let imageLinks = [];

      const date = Date.now();
      const imageData = new FormData();

      // Upload images to Cloudinary
      for (const image of images) {
        imageData.append("file", image);
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
        "/api/report",
        {
          cedula,
          references,
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

      router.push("/user-dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-[80%] flex flex-col gap-y-5 px-4 md:px-10 py-5 font-poppins"
    >
      <h1 className="font-bold text-center underline text-2xl cursor-default hidden lg:block">
        Agregue Información
      </h1>
      <label className="font-bold flex flex-col">
        Referencias
        <input
          type="text"
          className="py-2 px-3 border-b-2 border-black outline-none"
          {...register("references", { required: true })}
        />
        {errors.referencias && (
          <div className="text-red-700">Las referencias son requeridas</div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Fotos del incidente y referencias
        <input
          type="file"
          multiple={true}
          className="py-2 px-3 border-[1px] border-black outline-none"
          {...register("images", { required: true })}
        />
        {errors.imagenes && (
          <div className="text-red-700">Las fotos son requeridas</div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Tipo
        <select
          className="border-[1px] border-black outline-none"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Bache">Bache</option>
          <option value="Cableado en el suelo">Cableado en el suelo</option>
          <option value="Espacio ilegalmente ocupado">
            Espacio ilegalmente ocupado
          </option>
        </select>
      </label>

      <div>
        <h1 className="font-bold">Dirección seleccionada</h1>
        <p>{fullAddress}</p>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="border-[1px] border-black hover:bg-black hover:text-white w-max py-1 px-10 cursor-pointer"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormInfo;
