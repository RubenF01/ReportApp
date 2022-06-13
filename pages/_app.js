import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import GlobalContext from "../context/GlobalContext";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const cookies = parseCookies();

  useEffect(() => {
    cookies?.user
      ? setLoggedUser(JSON.parse(cookies.user))
      : setLoggedUser(null);
  }, [cookies.user]);

  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider value={{ loggedUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
