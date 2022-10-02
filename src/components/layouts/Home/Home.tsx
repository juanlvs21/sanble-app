import { Outlet } from "react-router-dom";

import { BottomBar } from "@/components/modules/home/BottomBar";
import styles from "./Home.module.css";

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
  return (
    <>
      <section
        className={`${styles.homeContainer} ${transitionStage}`}
        onAnimationEnd={onAnimationEnd}
      >
        <h1>Home</h1>
        <Outlet />
      </section>
      <BottomBar />
    </>
  );
};
