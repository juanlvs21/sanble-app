import { useRouteError } from "react-router-dom";

import { ImageExtended } from "../ImageExtended";

import styles from "./ErrorScreen.module.css";

export const ErrorScreen = () => {
  let error = useRouteError();

  console.info("ErrorScreen: ", location, error);

  return (
    <div className={styles.errorScreen}>
      <ImageExtended src="/assets/images/error.svg" width={300} />

      <h1>Lo sentimos, ha ocurrido un error</h1>
      <span>
        Si el problema persiste, por favor contacta al soporte técnico
      </span>
    </div>
  );
};
