import { IonButtons, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";

import { useApp } from "@/hooks/useApp";
import { TopBarUserBtn } from "@/components/common/TopBarUserBtn";

import styles from "./TopBar.module.css";

type ComponentProps = {
  /**
   * React component or string for the TopBar title
   */
  title?: React.ReactElement | string;
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
  /**
   * If true, the TopBar will become sticky when scrolling.
   */
  sticky?: boolean;
};

export const TopBar: React.FC<ComponentProps> = ({
  title,
  startUser,
  start,
  end,
  loading,
  sticky,
}) => {
  const { scrollTop } = useApp();

  return (
    <IonToolbar
      className={`${styles.topBarContainer} ${
        sticky && scrollTop > 25 ? styles.sticky : ""
      }`}
    >
      {loading && (
        <IonProgressBar
          type="indeterminate"
          className={styles.topBarProgressBar}
        />
      )}

      {(start || startUser) && (
        <IonButtons slot="start" className={styles.topBarStart}>
          {startUser ? <TopBarUserBtn /> : start}
        </IonButtons>
      )}
      {title && <IonTitle className={styles.topBarTitle}>{title}</IonTitle>}
      {end && (
        <IonButtons slot="end" className={styles.topBarEnd}>
          {end}
        </IonButtons>
      )}
    </IonToolbar>
  );
};
