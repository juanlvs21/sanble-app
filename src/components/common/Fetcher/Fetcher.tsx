import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from "@ionic/react";

import { useApp } from "@/hooks/useApp";
import styles from "./Fetcher.module.css";

type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[] | string;
  /**
   * (JSX attribute) LocalJSX.IonRefresher["onIonRefresh"]?: ((event: CustomEvent<RefresherEventDetail>) => void) | undefined
   * Emitted when the user lets go of the content and has pulled down further than the pullMin or pulls the content down and exceeds the pullMax. Updates the refresher state to refreshing. The complete() method should be called when the async operation has completed.
   */
  handleRefresh?: () => Promise<any>;
  /**
   * (JSX attribute) LocalJSX.IonRefresher["onIonRefresh"]?: ((event: CustomEvent<RefresherEventDetail>) => void) | undefined
   * Emitted when the user lets go of the content and has pulled down further than the pullMin or pulls the content down and exceeds the pullMax. Updates the refresher state to refreshing. The complete() method should be called when the async operation has completed.
   */
  handleInfiniteScroll?: () => Promise<any>;
  /**
   * Custom className for content component
   */
  className?: string;
};

const Fetcher: React.FC<ComponentProps> = ({
  children,
  className = "",
  handleRefresh,
  handleInfiniteScroll,
}) => {
  const { handleSeScrollTop } = useApp();

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (handleRefresh) await handleRefresh();
    event.detail.complete();
  };

  const infiniteFetch = async (event: InfiniteScrollCustomEvent) => {
    if (handleInfiniteScroll) await handleInfiniteScroll();
    event.target.complete();
  };

  return (
    <section className={styles.sectionFetcher}>
      <IonContent
        className={`${styles.ionContentFetcher} ${className}`}
        onIonScroll={handleSeScrollTop}
        scrollEvents
      >
        {handleRefresh && (
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            className={styles.fetcherRefresh}
          >
            <IonRefresherContent />
          </IonRefresher>
        )}
        {children}

        {handleInfiniteScroll && (
          <IonInfiniteScroll onIonInfinite={infiniteFetch} threshold="100px">
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              // loadingText="Cargando..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        )}
      </IonContent>
    </section>
  );
};

export default Fetcher;
