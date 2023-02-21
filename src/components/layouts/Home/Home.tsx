import { BottomBar } from "@/components/modules/home/BottomBar";
import { useRouteMatch } from "react-router";
import styles from "./Home.module.css";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const HomeLayout = ({ children }: ComponentProps) => {
  const matchApp = useRouteMatch({
    path: "/app",
    exact: true,
  });
  const matchAppFairs = useRouteMatch({
    path: "/app/ferias",
    exact: true,
  });
  const matchAppStands = useRouteMatch({
    path: "/app/stands",
    exact: true,
  });
  const matchAppProducts = useRouteMatch({
    path: "/app/productos",
    exact: true,
  });

  const showBottomBar =
    matchApp || matchAppFairs || matchAppStands || matchAppProducts;

  return showBottomBar ? (
    <div className={`${styles.homeContainer} `}>
      <section className={`${styles.homeContent}`}>{children}</section>
      <BottomBar />
    </div>
  ) : (
    <>{children}</>
  );
};
