/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import ButtonLink from "../components/button/ButtonLink";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ReportApp</title>
        <meta
          name="description"
          content="Created by Ruben Frias & Melvin Guerra"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex font-poppins min-h-screen relative">
        <div className="w-1/2 relative">
          <img
            className="h-full object-cover"
            src="/landingbackground.png"
            alt="Landing Background"
          />

          <div className="bg-black/70 absolute inset-0"></div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center space-y-10">
          <h1 className="font-bold text-7xl w-[30rem] text-center">
            Bienvenido a ReportApp
          </h1>
          <div className="flex flex-col space-y-5">
            <ButtonLink title="Acceder" link="/acceder" />
            <ButtonLink title="Registro" link="/registro" />
          </div>
        </div>
      </main>
    </div>
  );
}
