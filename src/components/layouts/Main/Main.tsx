import { IonContent, IonCol } from "@ionic/react";
import { Outlet } from "react-router-dom";

import styles from "./Main.module.css";

type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const MainLayout: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => (
  <IonContent>
    <div>
      <main className={transitionStage} onAnimationEnd={onAnimationEnd}>
        <Outlet />
      </main>
    </div>
  </IonContent>
);
