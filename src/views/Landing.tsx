import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Splash } from "@/components/common/Splash";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/signin");
  }, []);

  return <Splash />;
};
