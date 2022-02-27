import {
  IonAvatar,
  IonButton,
  // IonBadge,
  IonContent,
  IonHeader,
  // IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  ScrollDetail,
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
   * Element on the end of the toolbar (Must have property slot="end")
   */
  headerEnd?: React.ReactNode;
  /**
   * (JSX attribute) LocalJSX.IonRefresher["onIonRefresh"]?: ((event: CustomEvent<RefresherEventDetail>) => void) | undefined
   * Emitted when the user lets go of the content and has pulled down further than the pullMin or pulls the content down and exceeds the pullMax. Updates the refresher state to refreshing. The complete() method should be called when the async operation has completed.
   */
  doRefresh?: (event: CustomEvent<RefresherEventDetail>) => void;
};

export const MainLayout: React.FC<ComponentProps> = ({
  title = "Sanble",
  headerEnd,
  children,
  doRefresh,
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

  const handleScroll = (event: CustomEvent<ScrollDetail>) => {
    console.log(event);
  };

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <IonToolbar className={styles.toolbar}>
          <IonButton slot="start" className={styles.avatarBtn} fill="clear">
            <IonAvatar className={styles.avatarImg}>
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="example"
              />
            </IonAvatar>
          </IonButton>
          <IonTitle>{title}</IonTitle>
          {headerEnd || <div slot="end" className={styles.headerEndFake} />}
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className={styles.content}
        onIonScroll={handleScroll}
      >
        {doRefresh && (
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent />
          </IonRefresher>
        )}
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
