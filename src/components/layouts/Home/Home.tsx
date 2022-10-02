import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { BottomBar } from "@/components/modules/home/BottomBar";
import styles from "./Home.module.css";
import {
  navFadeUpStart,
  navFadeUpEnd,
} from "@/helpers/constTransitionsClasses";

type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const HomeLayout: React.FC<ComponentProps> = ({
  transitionStage,
  onAnimationEnd,
}) => {
  const [transitionStageLayout, setTransitionStageLayout] =
    useState(navFadeUpEnd);

  useEffect(() => {
    setTransitionStageLayout(navFadeUpStart);

    return () => {
      setTransitionStageLayout(navFadeUpEnd);
    };
  }, []);

  return (
    <div className={`${styles.homeContainer} ${transitionStageLayout}`}>
      <section
        className={`${styles.homeContent} ${transitionStage}`}
        onAnimationEnd={onAnimationEnd}
      >
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};
