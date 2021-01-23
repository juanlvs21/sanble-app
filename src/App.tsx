import React, { useEffect } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

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

/* Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App: React.FC = () => {
  useEffect(() => {
    const darkMode: any = localStorage.getItem("darkMode");
    if (darkMode === "true" && !document.body.classList.contains("dark")) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/auth/login" component={Login} exact />
            <Route path="/auth/register" component={Register} exact />
            <Redirect from="/" to="/auth/login" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
