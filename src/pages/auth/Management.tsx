import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// Layouts
import Layout from "../../layouts/Auth";

// Components
import VerifyEmail from "../../components/account/management/VerifyEmail";

// Interfaces
import IQueryAccountManagement from "../../interfaces/IQueryAccountManagement";

// Hooks
import useAccount from "../../hooks/useAccount";

// Page used to activate account and recover password
const Management: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { loading, errors, handleVerifyEmail } = useAccount();
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
    }
  }, [params]);

  return (
    <Layout compact={true}>
      {params.mode === "verifyEmail" && (
        <VerifyEmail loading={loading} errors={errors} />
      )}
    </Layout>
  );
};

export default Management;
