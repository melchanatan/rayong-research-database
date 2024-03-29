import App from "next/app";

function MyApp({ Component, pageProps, session }) {
  return (
    <MyWrapper session={session}>
      <Component {...pageProps} />
    </MyWrapper>
  );
}

export default MyApp;
import React from "react";
import { SessionProvider } from "next-auth/react";

const MyWrapper = ({ children, session }) => {
  // Add any state, logic, or additional components you want to provide to the wrapped components
  return <SessionProvider session={session}>{children} </SessionProvider>;
};
