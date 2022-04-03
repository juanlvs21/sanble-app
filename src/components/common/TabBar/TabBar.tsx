import { useMemo } from "react";
import { IonTabBar, IonTabButton } from "@ionic/react";
import { useLocation, useHistory } from "react-router";
import { BiStore, BiShoppingBag } from "react-icons/bi";
import { FiHome } from "react-icons/fi";

import styles from "./TabBar.module.css";

export const TabBar: React.FC = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const tabs = useMemo(
    () => [
      {
        tab: "/",
        icon: (
          <FiHome
            size={28}
            className={pathname === "/" ? styles.tabActive : ""}
          />
        ),
        active: pathname === "/",
      },
      {
        tab: "/ferias",
        icon: (
          <BiStore
            size={28}
            className={pathname === "/ferias" ? styles.tabActive : ""}
          />
        ),
        active: pathname === "/ferias",
      },
      {
        tab: "/stands",
        icon: (
          <BiShoppingBag
            size={28}
            className={pathname === "/stands" ? styles.tabActive : ""}
          />
        ),
        active: pathname === "/stands",
      },
    ],
    [pathname]
  );
  const handleTabWillChange = (
    event: CustomEvent<{
      tab: string;
    }>
  ) => push(event.detail.tab);

  return (
    <div className={styles.tabbarContainer}>
      <IonTabBar
        slot="bottom"
        className={styles.tabbar}
        onIonTabsWillChange={handleTabWillChange}
      >
        {tabs.map((tab) => (
          <IonTabButton key={tab.tab} tab={tab.tab} href={tab.tab}>
            {tab.icon}
            {/* <IonBadge>6</IonBadge> */}
          </IonTabButton>
        ))}
      </IonTabBar>
    </div>
  );
};
