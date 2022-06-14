import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import GlobalContext from "../context/GlobalContext";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [location, setLocation] = useState({ lng: 0, lat: 0 });
  const [reports, setReports] = useState({});
  const cookies = parseCookies();
  console.log(cookies.reports);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lng: position.coords.latitude,
        lat: position.coords.longitude,
      });
    });

    cookies?.user
      ? setLoggedUser(JSON.parse(cookies.user))
      : setLoggedUser(null);
  }, [cookies.user]);

  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider
        value={{ loggedUser, location, setLocation, reports, setReports }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
