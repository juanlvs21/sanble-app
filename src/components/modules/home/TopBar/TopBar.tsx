import { IonButtons, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { TopBarUserBtn } from "../TopBarUserBtn";

import styles from "./TopBar.module.css";

type ComponentProps = {
  /**
   * React component to start slot
   */
  start?: React.ReactElement;
  /**
   * React component to end slot
   */
  end?: React.ReactElement;
  /**
   * If true, the user's profile picture will be found in the "start" slot. This key has priority over the "start" key.
   */
  startUser?: boolean;
  /**
   * If true, an infinite progressbar representing the state of loading will be displayed.
   */
  loading?: boolean;
};

export const TopBar: React.FC<ComponentProps> = ({
  startUser,
  start,
  end,
  loading,
}) => (
  <IonToolbar className={styles.homeTopBarContainer}>
    {loading && (
      <IonProgressBar
        type="indeterminate"
        className={styles.homeTopBarProgressBar}
      />
    )}

    {(start || startUser) && (
      <IonButtons slot="start" className={styles.homeTopBarStart}>
        {startUser ? <TopBarUserBtn /> : start}
      </IonButtons>
    )}
    <IonTitle className={styles.homeTopBarTitle}>Sanble</IonTitle>
    {end && (
      <IonButtons slot="end" className={styles.homeTopBarEnd}>
        {end}
      </IonButtons>
    )}
  </IonToolbar>
);
