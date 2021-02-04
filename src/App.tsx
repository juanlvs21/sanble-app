import React, { useEffect } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect } from "react-router-dom";

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
import useApp from "./hooks/useApp";
import useAuth from "./hooks/useAuth";
import useDarkmode from "./hooks/useDarkmode";

/* Components */
import PreloadScreen from "./components/preload/PreloadScreen";
import Route from "./components/router/Route";

/* Pages */
import NotFound from "./pages/404/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Welcome from "./pages/auth/Welcome";
import Home from "./pages/home/Home";

const App: React.FC = () => {
  const { initDarkMode } = useDarkmode();
  const { isMobile } = useApp();
  const { gettingSession, handleGetSession } = useAuth();

  useEffect(() => {
    initDarkMode();
  }, [initDarkMode]);

  useEffect(() => {
    if (gettingSession) handleGetSession();
  }, []); // eslint-disable-line

  return (
    <IonApp>
      {gettingSession && !isMobile() && <PreloadScreen />}

      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            {/* Auth */}
            <Route path="/auth/login">
              <Login />
            </Route>
            <Route path="/auth/register">
              <Register />
            </Route>
            <Redirect path="/auth" to="/auth/login" exact />
            <Route path="/auth/welcome" secured={true}>
              <Welcome />
            </Route>
            {/* Home */}
            <Route path="/" secured={true}>
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
