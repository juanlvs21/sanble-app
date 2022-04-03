import { useState } from "react";
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  ScrollDetail,
} from "@ionic/react";

import styles from "./Main.module.css";

import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { useAppStateValue } from "@/context/AppContext";
import { appActions } from "@/context/actions/appActions";

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
  const [{ showSidebar }, dispatch] = useAppStateValue();
  const { setShowSidebar } = appActions(dispatch);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const toggleSidebar = (show?: boolean) => {
    setShowSidebar(show ?? !showSidebar);
  };

  const handleScroll = (event: CustomEvent<ScrollDetail>) =>
    setScrollTop(event.detail.scrollTop);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (handleRefresh) await handleRefresh();
    event.detail.complete();
  };

  return (
    <>
      <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
      <IonPage
        className={`${styles.pageMainLayout} ${
          showSidebar ? styles.showSidebar : ""
        }`}
      >
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

        {showSidebar && (
          <div
            className={`${styles.contentSidebarOpen} animate__animated animate__fadeIn`}
            onClick={() => toggleSidebar(false)}
          />
        )}
      </IonPage>
    </>
  );
};
