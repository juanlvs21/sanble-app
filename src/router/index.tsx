import { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

const AuthLayout = lazy(() => import("@/components/layouts/Auth"));

const SigninScreen = lazy(() => import("@/screens/auth/Signin"));
const SignupScreen = lazy(() => import("@/screens/auth/Signup"));

const Loading = <p>Loading...</p>;

export const Routes: React.FC = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/app" replace />,
    },
    {
      path: "/app",
      element: <h1>App</h1>,
    },
    {
      path: "/app/sesion",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/app/sesion/entrar" replace />,
        },
        {
          path: "entrar",
          element: (
            <Suspense fallback={Loading}>
              <SigninScreen />
            </Suspense>
          ),
        },
        {
          path: "registrar",
          element: (
            <Suspense fallback={Loading}>
              <SignupScreen />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return elements;
};
