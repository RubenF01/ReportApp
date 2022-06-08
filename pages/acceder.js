import NavBar from "../components/nav/NavBar";
import FormAcceder from "../components/form/FormAcceder";

const Acceder = () => {
  return (
    <main className="flex font-poppins min-h-screen relative">
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

      <NavBar />
    </main>
  );
};

export default Acceder;
