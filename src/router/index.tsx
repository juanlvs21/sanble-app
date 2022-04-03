import { Route } from "react-router-dom";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { HomeSreen } from "@/screens/Home";
import { FairsList } from "@/screens/fairs/List";
import { StandsList } from "@/screens/stands/List";
import { NearYou } from "@/screens/NearYou";
import { MyList } from "@/screens/MySanble/MyList";

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
          <Route path="/cerca" exact>
            <NearYou />
          </Route>
          <Route path="/mi-sanble" exact>
            <MyList />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};
