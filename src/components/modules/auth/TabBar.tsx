import { useMatch, Link, useLocation } from "react-router-dom";

import styles from "./TabBar.module.css";

export const TabBar: React.FC = () => {
  const location = useLocation();
  const matchSignin = useMatch("/app/sesion/entrar");
  const matchSignup = useMatch("/app/sesion/registrar");

  return (
    <nav className={styles.tabBarContiner}>
      <ul className={styles.navUl}>
        <li className={styles.navLi}>
          <Link
            to="/app/sesion/registrar"
            className={`${styles.navLink} ${
              matchSignup ? styles.linkActive : ""
            }`}
            state={{ prevRoute: location.pathname }}
          >
            Registrarse
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link
            to="/app/sesion/entrar"
            className={`${styles.navLink} ${
              matchSignin ? styles.linkActive : ""
            }`}
            state={{ prevRoute: location.pathname }}
          >
            Ingresar
          </Link>
        </li>
      </ul>
      <div className={styles.barContainer}>
        <div
          className={`${styles.barFill} ${
            matchSignin ? styles.barFillRight : ""
          }`}
        />
      </div>
    </nav>
  );
};
