import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const FormAcceder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const { correo, password } = formData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/acceder",
        {
          correo,
          password,
        },
        config
      );

      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));

      reset();

      router.push("/userDashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white absolute left-0 right-0 mx-auto w-[30rem] flex flex-col rounded-2xl shadow-md space-y-3 px-10 py-5"
    >
      <h1 className="font-bold text-center underline text-2xl">Acceder</h1>
      <label className="font-bold">Correo</label>
      <input
        type="email"
        className="bg-slate-300 rounded py-2 px-3"
        {...register("correo", { required: true })}
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

export default FormAcceder;
