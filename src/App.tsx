import React, { useEffect } from "react";
import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Custom Styles */
import "./theme/styles.css";

/* Style Font Family */
import "./assets/fonts/Quicksand/Quicksand.css";

/* Hooks */
import useAuth from "./hooks/useAuth";
import useDarkmode from "./hooks/useDarkmode";
import useApp from "./hooks/useApp";
import useCurrency from "./hooks/useCurrency";

/* Components */
import LoaderScreen from "./components/loader/FullScreen";
import Slides from "./components/slides/Container";
import Router from "./components/router/Router";

const App: React.FC = () => {
  const { initDarkMode } = useDarkmode();
  const { gettingSession, handleGetSession, session } = useAuth();
  const { firstWelcome, initWelcome } = useApp();
  const { hanldeGetUSD } = useCurrency();

  useEffect(() => {
    hanldeGetUSD();
  }, [hanldeGetUSD]);

  useEffect(() => {
    initDarkMode();
    initWelcome();
  }, [initDarkMode, initWelcome]);

  useEffect(() => {
    if (gettingSession) handleGetSession();
  }, []); // eslint-disable-line

  return (
    <IonApp>
      {gettingSession ? (
        <LoaderScreen overlays={true} />
      ) : firstWelcome && !session ? (
        <Slides />
      ) : (
        <Router />
      )}
    </IonApp>
  );
};

export default App;
