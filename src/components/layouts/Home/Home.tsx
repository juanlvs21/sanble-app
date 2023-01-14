import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { BottomBar } from "@/components/modules/home/BottomBar";
import {
  navFadeUpEnd,
  navFadeUpStart,
} from "@/helpers/constTransitionsClasses";
import { useApp } from "@/hooks/useApp";
import styles from "./Home.module.css";

export type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const HomeLayout = ({
  transitionStage,
  onAnimationEnd,
}: ComponentProps) => {
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
