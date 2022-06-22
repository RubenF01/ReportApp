import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import ButtonLink from "../button/ButtonLink";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const FormLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [endAnimation, setEndAnimation] = useState(false);
  const control = useAnimation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const { email, password } = formData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/login",
        {
          email,
          password,
        },
        config
      );

      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));

      reset();

      setEndAnimation(true);
      control.start({
        x: "130%",
        transition: { duration: 0.6 },
      });

      setTimeout(() => {
        router.push("/user-dashboard");
      }, 600);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const clickHandler = (link) => {
    setEndAnimation(true);
    control.start({
      x: "130%",
      transition: { duration: 0.6 },
    });
    setTimeout(() => {
      router.push(link);
    }, 600);
  };

  useEffect(() => {
    control.start({ x: 0 });
  }, [control]);

  return (
    <motion.form
      initial={endAnimation ? { x: 0 } : { x: "100%" }}
      animate={control}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-[95%] sm:w-[80%] flex flex-col gap-y-10 px-4 md:px-10 py-5"
    >
      <h1 className="font-bold text-center underline text-2xl hidden lg:block">
        Acceder
      </h1>
      <label className="font-bold flex flex-col">
        Correo
        <input
          type="email"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-700">El correo es requerido</span>
        )}
      </label>

      <label className="font-bold flex flex-col">
        Contraseña
        <input
          type="password"
          className="border-b-2 border-black py-2 px-3 outline-none"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-700">La contraseña es requerida</span>
        )}
      </label>

      <div className="flex justify-center space-x-5 sm:space-x-10">
        <button
          type="submit"
          className="border-[1px] border-black hover:bg-black hover:text-white w-max py-1 px-10 cursor-pointer"
        >
          Acceder
        </button>
        <ButtonLink
          title="Cancelar"
          classes="hover:!bg-red-700"
          clickEvent={() => clickHandler("/")}
        />
      </div>
      {errorMessage && (
        <div className="text-red-700 text-center">{errorMessage}</div>
      )}
    </motion.form>
  );
};

export default FormLogin;
