/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import ButtonLink from "../components/button/ButtonLink";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const value = useContext(GlobalContext);
  const [endAnimation, setEndAnimation] = useState(false);
  const { loggedUser } = value;
  const control = useAnimation();
  const router = useRouter();

  const handleClick = (link) => {
    control.start({
      x: "100%",
      transition: { duration: 0.5 },
    });

    setTimeout(() => {
      router.push(link);
    }, 500);
  };

  useEffect(() => {
    control.start({ x: 0 });
  }, [control]);

  return (
    <div>
      <Head>
        <title>ReportApp</title>
        <meta
          name="description"
          content="Created by Ruben Frias & Melvin Guerra"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="theme-color" content="#000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>

      <main className="flex flex-col lg:flex-row font-poppins min-h-screen overflow-x-hidden">
        <div className="w-full lg:w-1/2 relative">
          <img
            className="h-[350px] sm:h-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0 flex flex-col items-center justify-center space-y-5 mt-10 lg:mt-0">
            <img
              className="w-32 md:w-44 lg:w-auto"
              src="/logo.png"
              alt="logo"
            />
            <h1 className="text-2xl lg:text-6xl text-white cursor-default">
              ReportApp
            </h1>
          </div>
        </div>

        <motion.div
          initial={endAnimation ? { x: 0 } : { x: "100%" }}
          animate={control}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center space-y-10"
        >
          {/* Agregar animacion despues de presinoar boton, todos los botones para la derecha */}
          <h1 className="font-bold text-4xl md:text-7xl w-[23rem] md:w-[30rem] text-center cursor-default pt-10 lg:pt-0">
            Bienvenido a ReportApp
          </h1>
          {loggedUser ? (
            <div className="flex flex-col space-y-5">
              <ButtonLink title="Dashboard" link="/user-dashboard" />
            </div>
          ) : (
            <div className="flex flex-col space-y-5">
              <ButtonLink
                title="Acceder"
                clickEvent={() => handleClick("/login")}
              />
              <ButtonLink
                title="Registro"
                clickEvent={() => handleClick("/register")}
              />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
