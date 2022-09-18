import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "@/components/layouts/Auth";
import { useTransitionsScreen } from "@/hooks/useTransitionsScreen";

const SigninScreen = lazy(() => import("@/screens/auth/Signin"));
const SignupScreen = lazy(() => import("@/screens/auth/Signup"));

const Loading = <p>Loading...</p>;

export const AppRoutes: React.FC = () => {
  const {
    displayLocation,
    auth: { onAnimationEndAuth, transitionStageAuth },
  } = useTransitionsScreen();

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Navigate to="/app" />} />
      <Route path="/app" element={<h1>App</h1>} />
      <Route
        path="/app/sesion"
        element={
          <AuthLayout
            onAnimationEnd={onAnimationEndAuth}
            transitionStage={transitionStageAuth}
          />
        }
      >
        <Route index element={<Navigate to="/app/sesion/entrar" replace />} />
        <Route
          path="entrar"
          element={
            <Suspense fallback={Loading}>
              <SigninScreen />
            </Suspense>
          }
        />
        <Route
          path="registrar"
          element={
            <Suspense fallback={Loading}>
              <SignupScreen />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
