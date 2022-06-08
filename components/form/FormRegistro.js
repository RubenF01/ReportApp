import { useForm } from "react-hook-form";

const FormRegistro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white absolute left-0 right-0 mx-auto w-[30rem] flex flex-col rounded-2xl shadow-md space-y-3 px-10 py-5"
    >
      <h1 className="font-bold text-center underline text-2xl">Registro</h1>
      <label className="font-bold">Nombre</label>
      <input
        type="text"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("nombre", { required: true })}
      />

      <label className="font-bold">Apellido</label>
      <input
        type="text"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("apellido", { required: true })}
      />

      <label className="font-bold">Correo</label>
      <input
        type="email"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("correo", { required: true })}
      />

      <label className="font-bold">Cédula</label>
      <input
        className="bg-slate-300 rounded py-2 px-3"
        {...register("cedula", { required: true, pattern: /[0-9]+(-[0-9]+)+/ })}
      />

      <label className="font-bold">Contraseña</label>
      <input
        type="password"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("password", { required: true })}
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

export default FormRegistro;
