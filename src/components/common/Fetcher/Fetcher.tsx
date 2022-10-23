import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from "@ionic/react";

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
};

const Fetcher: React.FC<ComponentProps> = ({
  children,
  handleRefresh,
  handleInfiniteScroll,
}) => {
  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (handleRefresh) await handleRefresh();
    event.detail.complete();
  };

  const infiniteFetch = async (event: InfiniteScrollCustomEvent) => {
    if (handleInfiniteScroll) await handleInfiniteScroll();
    event.target.complete();
  };

  return (
    <>
      {handleRefresh && (
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
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
    </>
  );
};

export default Fetcher;
