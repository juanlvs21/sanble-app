import { IonAvatar, IonItem, IonList } from "@ionic/react";
import { Link, PathMatch } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./BottomBar.module.css";

export type ComponentProps = {
  items: {
    path: ERoutesName;
    icon: JSX.Element;
    active: PathMatch<string> | null;
  }[];
};

export const BottomBar = ({ items }: ComponentProps) => {
  const { showSidebar, isCapacitor } = useApp();

  return (
    <div
      className={`${styles.bottomBarContainer} ${
        showSidebar ? styles.showSidebar : ""
      } ${isCapacitor ? styles.isCapacitor : ""}`}
    >
      <IonList className={styles.bottomBarList}>
        {items.map((item) => (
          <Link to={item.path} key={item.path}>
            <IonItem
              className={`${styles.bottomBarItem} ${
                item.active ? styles.bottomBarItemActive : ""
              }`}
              button
              detail={false}
            >
              <IonAvatar className={styles.bottomBarItemIcon}>
                {item.icon}
              </IonAvatar>
            </IonItem>
          </Link>
        ))}
      </IonList>
    </div>
  );
};
