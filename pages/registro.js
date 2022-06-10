/* eslint-disable @next/next/no-img-element */
import FormRegistro from "../components/form/FormRegistro";

const Registro = () => {
  return (
    <main className="flex font-poppins min-h-screen relative">
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
    </main>
  );
};

export default Registro;
