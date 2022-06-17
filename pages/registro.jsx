/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FormRegistro from "../components/form/FormRegistro";

const Registro = () => {
  return (
    <div>
      <Head>
        <title>Registro</title>
        <meta
          name="description"
          content="Created by Ruben Frias & Melvin Guerra"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className="flex font-poppins min-h-screen">
        <div className="w-full relative">
          <img
            className="h-screen w-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0 flex justify-center items-center">
            <FormRegistro />
          </div>
        </div>
      </main> */}

      <main className="flex font-poppins min-h-screen">
        <div className="w-1/2 relative">
          <img
            className="h-screen w-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0 flex flex-col items-center justify-center space-y-5">
            <img src="/logo.png" alt="logo" />
            <h1 className="text-6xl text-white cursor-default">ReportApp</h1>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <FormRegistro />
        </div>
      </main>
    </div>
  );
};

export default Registro;
