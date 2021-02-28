import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// Styles
import styles from "./Auth.module.css";

// Layouts
import Layout from "../../layouts/Auth";

// Components
import VerifyEmail from "../../components/account/management/VerifyEmail";
import PasswordReset from "../../components/account/management/PasswordReset";
import LoaderVerifyCode from "../../components/account/management/LoaderVerifyCode";

// Interfaces
import IQueryAccountManagement from "../../interfaces/IQueryAccountManagement";

// Hooks
import useAccount from "../../hooks/useAccount";

// Page used to activate account and recover password
const Management: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const {
    loadingVerifyCode,
    loading,
    errors,
    handleVerifyEmail,
    handleVerifyResetPassword,
    handleResetPassword,
  } = useAccount();
  const [params, setParams] = useState<IQueryAccountManagement>({
    mode: "",
    oobCode: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    setParams({
      mode: urlParams.get("mode"),
      oobCode: urlParams.get("oobCode"),
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (params) {
      if (params.mode === "verifyEmail")
        handleVerifyEmail(params.oobCode as string);
      else if (params.mode === "resetPassword")
        handleVerifyResetPassword(params.oobCode as string);
    }
  }, [params]); // eslint-disable-line

  const handleSubmitPasswordReset = ({ password }: any) => {
    handleResetPassword(params.oobCode as string, password).then(() =>
      history.push("/auth/recoverPassword/success")
    );
  };

  return (
    <Layout compact={true}>
      {params.mode === "verifyEmail" && (
        <VerifyEmail loading={loading} errors={errors} />
      )}
      {params.mode === "resetPassword" && (
        <div>
          <h1 className="text_center">Restablecer Contraseña</h1>

          {loadingVerifyCode ? (
            <>
              <h4 className="text_center">Verificando Código</h4>
              <LoaderVerifyCode loading={loadingVerifyCode} errors={errors} />
            </>
          ) : (
            <PasswordReset
              onSubmit={handleSubmitPasswordReset}
              existError={errors ? true : false}
            />
          )}

          {!loadingVerifyCode && !loading && errors && (
            <div className={styles.invalid_code}>{errors}</div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Management;
