import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import GlobalContext from "../context/GlobalContext";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const cookies = parseCookies();
  const [loggedUser, setLoggedUser] = useState(null);
  const [location, setLocation] = useState({ lng: 0, lat: 0 });
  const [reports, setReports] = useState([]);
  const [address, setAddress] = useState([]);
  const [changeColor, setChangeColor] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lng: position.coords.latitude,
        lat: position.coords.longitude,
      });
    });

    cookies?.user
      ? setLoggedUser(JSON.parse(cookies?.user))
      : setLoggedUser(null);
  }, [cookies.user]);

  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider
        value={{
          loggedUser,
          location,
          setLocation,
          reports,
          setReports,
          address,
          setAddress,
          changeColor,
          setChangeColor,
          loading,
          setLoading,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
