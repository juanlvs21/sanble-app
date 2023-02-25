import { Link, useMatch, useLocation } from "react-router-dom";

import { ERoutesName } from "@/types/TRoutes";
import styles from "./TabBar.module.css";

export const TabBar = () => {
  const location = useLocation();
  const matchSignin = useMatch(ERoutesName.SESSION_SIGNIN);
  const matchSignup = useMatch(ERoutesName.SESSION_SIGNUP);

  return (
    <nav className={styles.tabBarContiner}>
      <ul className={styles.navUl}>
        <li className={styles.navLi}>
          <Link
            to={ERoutesName.SESSION_SIGNIN}
            state={{ prevRoute: location.pathname }}
            className={`${styles.navLink} ${
              matchSignin ? styles.linkActive : ""
            }`}
          >
            Ingresar
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link
            to={ERoutesName.SESSION_SIGNUP}
            state={{ prevRoute: location.pathname }}
            className={`${styles.navLink} ${
              matchSignup ? styles.linkActive : ""
            }`}
          >
            Registrarse
          </Link>
        </li>
      </ul>
      <div className={styles.barContainer}>
        <div
          className={`${styles.barFill} ${
            matchSignup ? styles.barFillRight : ""
          }`}
        />
      </div>
    </nav>
  );
};
