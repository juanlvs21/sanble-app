import { useState } from "react";
import {
  // IonBadge,
  IonContent,
  // IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTabBar,
  IonTabButton,
  RefresherEventDetail,
  ScrollDetail,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router";
import { FiHome } from "react-icons/fi";
import { BiStore, BiShoppingBag } from "react-icons/bi";

import styles from "./Main.module.css";

import { Header } from "@/components/common/Header";

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
  handleRefresh?: () => Promise<any>;
};

export const MainLayout: React.FC<ComponentProps> = ({
  title = "Sanble",
  headerEnd,
  children,
  handleRefresh,
}) => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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

  const toggleSidebar = (show?: boolean) => {
    console.log("TOOGLE");
    setShowSidebar((state) => show ?? !state);
  };

  const handleScroll = (event: CustomEvent<ScrollDetail>) =>
    setScrollTop(event.detail.scrollTop);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (handleRefresh) await handleRefresh();
    event.detail.complete();
  };

  return (
    <IonPage>
      <Header
        title={title}
        headerEnd={headerEnd}
        scrollTop={scrollTop}
        toggleSidebar={toggleSidebar}
      />

      <IonContent
        fullscreen
        className={styles.content}
        onIonScroll={handleScroll}
        scrollEvents
      >
        {handleRefresh && (
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
