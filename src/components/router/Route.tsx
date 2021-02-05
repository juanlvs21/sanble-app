import React from "react";
import { Route, Redirect } from "react-router-dom";

// Hooks
import useAuth from "../../hooks/useAuth";

interface ContainerProps {
  children: React.ReactNode;
  path: string;
  secured?: boolean;
}

const RouteApp: React.FC<ContainerProps> = ({
  children,
  path,
  secured = false,
}) => {
  const { session } = useAuth();

  if (secured) {
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
  } else return <Route path={path} exact render={() => children} />;
};

export default RouteApp;
