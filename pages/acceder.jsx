/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FormAcceder from "../components/form/FormAcceder";

const Acceder = () => {
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

      <main className="flex font-poppins min-h-screen">
        <div className="w-full relative">
          <img
            className="h-screen w-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0 flex justify-center items-center">
            <FormAcceder />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Acceder;
