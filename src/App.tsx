import { IonApp, setupIonicReact } from "@ionic/react";
import { lazy } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/global.css";
import "./theme/transitions.css";
import "./theme/variables.css";

import { useStatusBar } from "@/hooks/useStatusBar";
import { router } from "@/router";

setupIonicReact();

const App = () => {
  const { overlaysStatusBar } = useStatusBar();

  overlaysStatusBar(true);

  return (
    <IonApp className="animate__animated animate__fadeIn">
      <RouterProvider router={router} />
    </IonApp>
  );
};

export default App;
