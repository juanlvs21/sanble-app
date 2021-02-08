import React from "react";
import { Route, Redirect } from "react-router-dom";

// Hooks
import useAuth from "../../hooks/useAuth";

interface ContainerProps {
  children: React.ReactNode;
  path: string;
}

const RouteSecure: React.FC<ContainerProps> = ({ children, path }) => {
  const { session } = useAuth();

  return (
    <Route
      exact
      path={path}
      render={({ location }) =>
        session ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RouteSecure;
