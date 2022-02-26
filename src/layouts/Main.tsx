import {
  // IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  // IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router";
import { FiHome } from "react-icons/fi";
import { BiStore, BiShoppingBag } from "react-icons/bi";

import styles from "./Main.module.css";

type ComponentProps = {
  /**
   * Children component
   */
  children?: React.ReactNode;
  /**
   * Toolbar title
   *
   * @default "Sanble"
   */
  title?: string;
  /**
   * Element on the start of the toolbar (Must have property slot="start")
   */
  headerStart?: React.ReactNode;
  /**
   * Element on the end of the toolbar (Must have property slot="end")
   */
  headerEnd?: React.ReactNode;
};

export const MainLayout: React.FC<ComponentProps> = ({
  title = "Sanble",
  headerStart,
  headerEnd,
  children,
}) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const tabs = [
    {
      tab: "/",
      icon: <FiHome size={28} />,
      active: pathname === "/",
    },
    {
      tab: "/ferias",
      icon: <BiStore size={28} />,
      active: pathname === "/ferias",
    },
    {
      tab: "/stands",
      icon: <BiShoppingBag size={28} />,
      active: pathname === "/stands",
    },
  ];

  const handleTabWillChange = (
    event: CustomEvent<{
      tab: string;
    }>
  ) => push(event.detail.tab);

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <IonToolbar className={styles.toolbar}>
          {headerStart}
          <IonTitle>{title}</IonTitle>
          {headerEnd}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.content}>
        {children}
      </IonContent>

      <div className={styles.tabbarContainer}>
        <IonTabBar
          slot="bottom"
          className={styles.tabbar}
          onIonTabsWillChange={handleTabWillChange}
        >
          {tabs.map((tab) => (
            <IonTabButton
              key={tab.tab}
              tab={tab.tab}
              href={tab.tab}
              className={`${tab.active ? "active" : ""}`}
            >
              {tab.icon}
              {/* <IonBadge>6</IonBadge> */}
            </IonTabButton>
          ))}
        </IonTabBar>
      </div>
    </IonPage>
  );
};
