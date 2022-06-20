import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonLink from "../button/ButtonLink";
import { motion } from "framer-motion";

const FormRegistro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    const { nombre, apellido, correo, cedula, password } = formData;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/registro",
      {
        nombre,
        apellido,
        correo,
        cedula,
        password,
      },
      config
    );

    reset();
  };

  return (
    <motion.form
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex flex-col w-[95%] sm:w-[80%] gap-y-4 px-4 md:px-10 py-5"
    >
      <h1 className="font-bold text-center underline text-2xl hidden lg:block">
        Registro
      </h1>
      <label className="font-bold flex flex-col">
        Nombre
        <input
          type="text"
          placeholder="Juan"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && (
          <div className="text-red-700">El nombre es requerido</div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Apellido
        <input
          type="text"
          placeholder="Perez"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("apellido", { required: true })}
        />
        {errors.apellido && (
          <div className="text-red-700">El apellido es requerido</div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Correo
        <input
          type="email"
          className="border-b-2 border-black py-2 px-3 outline-none"
          placeholder="mail@email.com"
          {...register("correo", { required: true })}
        />
        {errors.correo && (
          <div className="text-red-700">El correo es requerido</div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Cédula
        <input
          type="number"
          className="border-b-2 border-black py-2 px-3 outline-none"
          placeholder="001-0000000-0"
          {...register("cedula", {
            required: true,
            pattern: /[0-9]+(-[0-9]+)+/,
          })}
        />
        {errors.cedula?.type === "required" && (
          <div className="text-red-700">La cédula es requerida</div>
        )}
        {errors.cedula?.type === "pattern" && (
          <div className="text-red-700">
            Patrón de cedula incorrecto. Utilice guiones.
          </div>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Contraseña
        <input
          type="password"
          placeholder="************"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-700">La contraseña es requerida</span>
        )}
      </label>

      <div className="flex justify-center space-x-2 sm:space-x-10 pt-10">
        <button
          type="submit"
          className="border-[1px] border-black hover:bg-black hover:text-white w-max py-1 px-10 cursor-pointer"
        >
          Registrarse
        </button>
        <ButtonLink title="Cancelar" link="/" classes="hover:!bg-red-700" />
      </div>
    </motion.form>
  );
};

export default FormRegistro;
