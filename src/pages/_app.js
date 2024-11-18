import "bootstrap/dist/css/bootstrap.css";
import StateContext from "../components/context/StateContext";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/scrollbar.css";
import "../styles/date-picker.css";
import "../styles/style.css";
import Head from "next/head";
import "../styles/WidgetInstagram.css";
import ErrorBoundary from "../components/common/ErrorBoundary";
import ExternalLinkManager from "../components/ExternalLinkManager";

function MyApp({ Component, pageProps }) {
  return (
    <>
      
      <ErrorBoundary>
        <StateContext>
          <ExternalLinkManager />
          <Component {...pageProps} />
        </StateContext>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
