import { IonAvatar, IonItem, IonList } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineStorefront } from "react-icons/md";
import { Link, useLocation, useMatch } from "react-router-dom";

import { navFadeEnd, navFadeStart } from "@/helpers/constTransitionsClasses";
import styles from "./BottomBar.module.css";

export const BottomBar: React.FC = () => {
  const { pathname } = useLocation();
  const [transitionStage, setTransitionStage] = useState(navFadeEnd);

  const matchHome = useMatch("/app");
  const matchFairsList = useMatch("/app/ferias");
  const matchStandsList = useMatch("/app/stands");
  const matchProductsList = useMatch("/app/productos");

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

  useEffect(() => {
    setTransitionStage(navFadeStart);

    return () => {
      setTransitionStage(navFadeEnd);
    };
  }, []);

  return (
    <div className={`${styles.homeBarContainer} ${transitionStage}`}>
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
