import { Route } from "react-router-dom";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { HomeSreen } from "../screens/Home";
import { FairsList } from "../screens/fairs/List";
import { StandsList } from "../screens/stands/List";

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <IonRouterOutlet id="main">
          <Route path="/" exact>
            <HomeSreen />
          </Route>
          <Route path="/ferias" exact>
            <FairsList />
          </Route>
          <Route path="/stands" exact>
            <StandsList />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};
