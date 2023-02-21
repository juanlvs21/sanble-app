import { IonAvatar, IonItem, IonList } from "@ionic/react";
import { useMemo } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineStorefront } from "react-icons/md";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import styles from "./BottomBar.module.css";

export const BottomBar = () => {
  const { pathname } = useLocation();

  const matchHome = useRouteMatch({
    path: "/app",
    exact: true,
  });
  const matchFairsList = useRouteMatch({
    path: "/app/ferias",
    exact: true,
  });
  const matchStandsList = useRouteMatch({
    path: "/app/stands",
    exact: true,
  });
  const matchProductsList = useRouteMatch({
    path: "/app/productos",
    exact: true,
  });

  const items = useMemo(
    () => [
      {
        path: "/app",
        icon: <FiHome size={26} />,
        active: matchHome,
      },
      {
        path: "/app/ferias",
        icon: <BiStoreAlt size={26} />,
        active: matchFairsList,
      },
      {
        path: "/app/stands",
        icon: <MdOutlineStorefront size={26} />,
        active: matchStandsList,
      },
      {
        path: "/app/productos",
        icon: <HiOutlineShoppingBag size={26} />,
        active: matchProductsList,
      },
    ],
    [pathname]
  );

  return (
    <div className={`${styles.homeBarContainer}`}>
      <IonList className={styles.homeBarList}>
        {items.map((item) => (
          <Link to={item.path} key={item.path}>
            <IonItem
              className={`${styles.homeBarItem} ${
                item.active ? styles.homeBarItemActive : ""
              }`}
              button
              detail={false}
            >
              <IonAvatar className={styles.homeBarItemIcon}>
                {item.icon}
              </IonAvatar>
            </IonItem>
          </Link>
        ))}
      </IonList>
    </div>
  );
};
