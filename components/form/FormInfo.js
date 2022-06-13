import { useForm } from "react-hook-form";
import { useState } from "react";

const FormInfo = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

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

      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white absolute left-0 right-0 mx-auto w-[30rem] flex flex-col rounded-2xl shadow-md space-y-3 px-10 py-5"
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

      <div className="flex justify-center">
        <input
          className="border-[1px] border-black hover:bg-black hover:text-white w-max rounded-3xl px-5 py-1 cursor-pointer"
          type="submit"
        />
      </div>
    </form>
  );
};

export default FormInfo;
