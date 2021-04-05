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
// Auth Recover Password
import RecoverPassword from "../../pages/auth/recoverPassword/Recover";
import RecoverPasswordSend from "../../pages/auth/recoverPassword/Send";
import RecoverPasswordChangeSuccess from "../../pages/auth/recoverPassword/ChangeSuccess";
// Auth Account Management
import AccountManagement from "../../pages/auth/Management";
// Home
import Home from "../../pages/home/Home";
//Profile
import Profile from "../../pages/profile/Profile";
//My Sanble
import MySanbleList from "../../pages/mysanble/List";
// Stands
import StandsList from "../../pages/stands/List";
import StandsDetails from "../../pages/stands/Details";
// Fairs
import FairsList from "../../pages/fairs/List";

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
            <Route
              path="/auth/recoverPassword/success"
              component={RecoverPasswordChangeSuccess}
              exact
            />
            <Route
              path="/auth/account/management"
              component={AccountManagement}
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
            {/* My Sanble */}
            <Route path="/my-sanble" exact>
              <RouteSecure component={MySanbleList} />
            </Route>
            {/* Stands */}
            <Route path="/stands" exact>
              <RouteSecure component={StandsList} />
            </Route>
            <Route path="/stand/:uuid" exact>
              <RouteSecure component={StandsDetails} />
            </Route>
            {/* Fairs */}
            <Route path="/fairs" exact>
              <RouteSecure component={FairsList} />
            </Route>
            <Route path="/404" component={NotFound} exact />
            <Route path="*" componentk={NotFound} />
            <Redirect path="/" to="/home" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      {showLoaderFullScreen && <LoaderScreen withBg={false} />}
    </>
  );
};

export default Router;
