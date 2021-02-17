import React from "react";
import { Redirect } from "react-router-dom";

// Hooks
import useAuth from "../../hooks/useAuth";

interface ContainerProps {
  component: React.FunctionComponent;
}

const RouteSecure: React.FC<ContainerProps> = ({ component: Component }) => {
  const { session } = useAuth();

  if (session) return <Component />;
  else return <Redirect to="/auth/login" />;
};

export default RouteSecure;
