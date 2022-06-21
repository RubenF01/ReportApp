/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FormLogin from "../components/form/FormLogin";
import { useMedia } from "react-use";

const Login = () => {
  const isWide = useMedia("(max-width: 1023px)", false);

  return (
    <div>
      <Head>
        <title>Acceder</title>
        <meta
          name="description"
          content="Created by Ruben Frias & Melvin Guerra"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col lg:flex-row font-poppins min-h-screen overflow-x-hidden">
        <div className="lg:w-1/2 relative">
          <img
            className="h-[350px] lg:h-screen w-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0 flex flex-col items-center justify-center space-y-5">
            <img
              className="hidden lg:block lg:w-auto"
              src="/logo.png"
              alt="logo"
            />
            <h1 className="hidden lg:block text-2xl lg:text-6xl text-white cursor-default">
              ReportApp
            </h1>
            {isWide && <h1 className="text-white text-4xl pt-8">Acceder</h1>}
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center items-center pt-8 lg:pt-0">
          <FormLogin />
        </div>
      </main>
    </div>
  );
};

export default Login;
