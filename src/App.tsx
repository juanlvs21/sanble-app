import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { lazy } from "react";

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

import { SuspenseComponent } from "@/components/common/SuspenseComponent";
import { AppProvider } from "@/context";
import { DataProvider } from "@/providers/DataProvider";

const AppRoutes = lazy(() =>
  import("@/router").then(({ AppRoutes }) => ({
    default: AppRoutes,
  }))
);

setupIonicReact();

const App = () => (
  <IonApp className="animate__animated animate__fadeIn">
    <IonReactRouter>
      <AppProvider>
        <DataProvider>
          <SuspenseComponent>
            <AppRoutes />
          </SuspenseComponent>
        </DataProvider>
      </AppProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
