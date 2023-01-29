import { IonButtons, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { TopBarUserBtn } from "@/components/common/TopBarUserBtn";
import { useApp } from "@/hooks/useApp";
import styles from "./TopBar.module.css";

export type ComponentProps = {
  /**
   * React component or string for the TopBar title
   */
  title?: React.ReactElement | string;
  /**
   * Set the title of the top bar to the color light in the color palette
   */
  titleLight?: boolean;
  /**
   * Set the font size of the title
   *
   * @default 28
   */
  titleSize?: number | string;
  /**
   * React component to start slot
   */
  start?: React.ReactElement;
  /**
   * React component to end slot
   */
  end?: React.ReactElement;
  /**
   * If true, the user's profile picture will be found in the "start" slot. This prop has priority over the "start" and "startGoBack" props.
   */
  startUser?: boolean;
  /**
   * Navigate to the previous screen. This prop has priority over the "start" prop.
   */
  startGoBack?: boolean;
  /**
   * If true, an infinite progressbar representing the state of loading will be displayed.
   */
  isLoading?: boolean;
  /**
   * If true, the TopBar will become sticky when scrolling.
   */
  sticky?: boolean;
  /**
   * If true, the TopBar will become sticky when scrolling regardless of scrolling.
   */
  stickyNoScroll?: boolean;
  /**
   * Custom className for content component
   */
  className?: string;
};

export const TopBar = ({
  title,
  startUser,
  startGoBack,
  start,
  end,
  isLoading,
  sticky,
  stickyNoScroll,
  titleLight,
  titleSize = 28,
  className = "",
}: ComponentProps) => {
  const navigate = useNavigate();
  const { scrollTop, isCapacitor } = useApp();

  return (
    <IonToolbar
      className={`${styles.topBarContainer} ${
        isCapacitor ? styles.isCapacitor : ""
      } ${
        (sticky && scrollTop > 25) || stickyNoScroll ? styles.sticky : ""
      } ${className}`}
    >
      {isLoading && (
        <IonProgressBar
          type="indeterminate"
          className={styles.topBarProgressBar}
        />
      )}

      {(start || startUser || startGoBack) && (
        <IonButtons slot="start" className={styles.topBarStart}>
          {startUser ? (
            <TopBarUserBtn />
          ) : (
            <>
              {startGoBack ? (
                <Button onClick={() => navigate(-1)}>
                  <IoIosArrowBack size={24} />
                </Button>
              ) : (
                start
              )}
            </>
          )}
        </IonButtons>
      )}
      {title && (
        <IonTitle
          className={`${styles.topBarTitle} ${
            titleLight ? styles.topBarTitleLight : ""
          } ${
            (sticky && scrollTop > 25) || stickyNoScroll ? styles.sticky : ""
          }`}
          style={{ fontSize: titleSize }}
        >
          {title}
        </IonTitle>
      )}
      {end && (
        <IonButtons slot="end" className={styles.topBarEnd}>
          {end}
        </IonButtons>
      )}
    </IonToolbar>
  );
};
