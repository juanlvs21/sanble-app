import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { LoadingSuspense } from "@/components/common/LoadingSuspense";

const HomeSreen = lazy(() => import("@/screens/Home"));
const FairsListScreen = lazy(() => import("@/screens/fairs/List"));
const StandsListScreen = lazy(() => import("@/screens/stands/List"));
const NearYouScreen = lazy(() => import("@/screens/NearYou"));
const MyListScreen = lazy(() => import("@/screens/MySanble/MyList"));

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <Switch>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Redirect to="/inicio" />} />
            <Route
              exact
              path="/inicio"
              render={() => (
                <Suspense fallback={<LoadingSuspense />}>
                  <HomeSreen />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/ferias"
              render={() => (
                <Suspense fallback={<LoadingSuspense />}>
                  <FairsListScreen />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/stands"
              render={() => (
                <Suspense fallback={<LoadingSuspense />}>
                  <StandsListScreen />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/cerca"
              render={() => (
                <Suspense fallback={<LoadingSuspense />}>
                  <NearYouScreen />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/mi-sanble"
              render={() => (
                <Suspense fallback={<LoadingSuspense />}>
                  <MyListScreen />
                </Suspense>
              )}
            />
            <Route>
              <h1>404</h1>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </Switch>
    </IonReactRouter>
  );
};
