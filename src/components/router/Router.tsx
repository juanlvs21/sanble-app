import React, { useState } from "react";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

// Components
import RouteSecure from "./RouteSecure";
import Menu from "../menu/Menu";
import LoaderScreen from "../loader/FullScreen";

// --- Screens ---
import NotFound from "../../pages/404/NotFound";
// Auth
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Welcome from "../../pages/auth/Welcome";
// Recover Password
import RecoverPassword from "../../pages/auth/recoverPassword/Recover";
import RecoverPasswordSend from "../../pages/auth/recoverPassword/Send";
// Home
import Home from "../../pages/home/Home";
//Profile
import Profile from "../../pages/profile/Profile";
// Stands
import StandsList from "../../pages/stands/List";

const Router: React.FC = () => {
  const [showLoaderFullScreen, setShowLoaderFullScreen] = useState<boolean>(
    false
  );

  return (
    <>
      <IonReactRouter>
        <IonSplitPane contentId="content">
          <Menu setShowLoader={setShowLoaderFullScreen} />
          <IonRouterOutlet id="content">
            {/* Auth */}
            <Redirect path="/auth" to="/auth/login" exact />
            <Route path="/auth/login" component={Login} exact />
            <Route path="/auth/register" component={Register} exact />
            <Route path="/auth/welcome" component={Welcome} exact />
            <Route
              path="/auth/recoverPassword"
              component={RecoverPassword}
              exact
            />
            <Route
              path="/auth/recoverPassword/send"
              component={RecoverPasswordSend}
              exact
            />
            {/* Home */}
            <Route path="/home" exact>
              <RouteSecure component={Home} />
            </Route>
            {/* Profile */}
            <Route path="/profile" exact>
              <RouteSecure component={Profile} />
            </Route>
            {/* Stands */}
            <Route path="/stands" exact>
              <RouteSecure component={StandsList} />
            </Route>
            <Redirect path="/" to="/home" exact />
            <Route path="*" component={NotFound} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      {showLoaderFullScreen && <LoaderScreen withBg={false} />}
    </>
  );
};

export default Router;
