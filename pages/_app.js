import GlobalStyle from "../styles";
import Navbar from "../components/layout/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
