import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import ButtonLink from "../button/ButtonLink";

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
      className="bg-white w-[80%] flex flex-col gap-y-10 px-10 py-5"
    >
      <h1 className="font-bold text-center underline text-2xl">Acceder</h1>
      <label className="font-bold flex flex-col">
        Correo
        <input
          type="email"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("correo", { required: true })}
        />
      </label>

      <label className="font-bold flex flex-col">
        Contraseña
        <input
          type="password"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("password", { required: true })}
        />
      </label>

      <div className="flex justify-center space-x-10">
        <button
          type="submit"
          className="border-[1px] border-black hover:bg-black hover:text-white w-max py-1 px-10 cursor-pointer"
        >
          Acceder
        </button>
        <ButtonLink title="Cancelar" link="/" classes="hover:!bg-red-700" />
      </div>
    </form>
  );
};

export default FormAcceder;
