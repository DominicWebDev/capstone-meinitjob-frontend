import GlobalStyle from "../styles";

import { SessionProvider } from "next-auth/react";
import { Slide, ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar/Navbar";

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import Font Awesome CSS

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <GlobalStyle />
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer limit={1} transition={Slide} />
      </SessionProvider>
    </>
  );
}
