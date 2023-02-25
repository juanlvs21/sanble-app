import { Outlet } from "react-router-dom";

import { BottomBar } from "@/components/modules/home/BottomBar";
import styles from "./Home.module.css";

export const HomeLayout = () => (
  <div className={`${styles.homeContainer}`}>
    <section className={`${styles.homeContent}`}>
      <Outlet />
    </section>
    <BottomBar />
  </div>
);
