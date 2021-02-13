import React from "react";

// Styles
import styles from "./Forms.module.css";

interface ContainerProps {
  error: any;
  touched: any;
}

const ErrorFormik: React.FC<ContainerProps> = ({ error, touched }) => {
  return (
    <span className={styles.error_formik}>
      {error && touched ? error : " "}
    </span>
  );
};

export default ErrorFormik;
