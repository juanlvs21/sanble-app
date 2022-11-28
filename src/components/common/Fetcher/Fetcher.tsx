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
import { Spinner } from "@/components/common/loaders/Spinner";

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
   * Custom className for section tag
   */
  classNameSection?: string;
  /**
   * Custom className for content component
   */
  classNameContent?: string;
};

export const Fetcher: React.FC<ComponentProps> = ({
  children,
  classNameSection = "",
  classNameContent = "",
  handleRefresh,
  handleInfiniteScroll,
}) => {
  const { handleSetScrollTop } = useApp();

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (handleRefresh) await handleRefresh();
    event.detail.complete();
  };

  const infiniteFetch = async (event: InfiniteScrollCustomEvent) => {
    if (handleInfiniteScroll) await handleInfiniteScroll();
    await event.target.complete();
  };

  return (
    <section className={`${styles.sectionFetcher} ${classNameSection}`}>
      <IonContent
        className={`${styles.ionContentFetcher} ${classNameContent}`}
        onIonScroll={handleSetScrollTop}
        scrollEvents
      >
        <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
          disabled={!handleRefresh}
          className={styles.fetcherRefresh}
        >
          <IonRefresherContent
            pullingIcon={undefined}
            pullingText=""
            refreshingSpinner={undefined}
            refreshingText=""
          >
            <Spinner className="refresher-refreshing-icon" center />
          </IonRefresherContent>
        </IonRefresher>

        {children}

        <IonInfiniteScroll
          onIonInfinite={infiniteFetch}
          disabled={!handleInfiniteScroll}
          threshold="100px"
          className={styles.fetcherInfiniteScroll}
        >
          <IonInfiniteScrollContent loadingSpinner={undefined} loadingText="">
            <div className={`${styles.infiniteScrollSpinner} infinite-loading`}>
              <Spinner center />
            </div>
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </section>
  );
};
