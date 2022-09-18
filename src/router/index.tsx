import { Suspense, lazy, useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AuthLayout from "@/components/layouts/Auth";

const SigninScreen = lazy(() => import("@/screens/auth/Signin"));
const SignupScreen = lazy(() => import("@/screens/auth/Signup"));

const Loading = <p>Loading...</p>;

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("navFadeUpStart");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("navFadeUpEnd");
  }, [location, displayLocation]);

  const onAnimationEndAuth = () => {
    if (transitionStage === "navFadeUpEnd") {
      setTransistionStage("navFadeUpStart");
      setDisplayLocation(location);
    }
  };

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Navigate to="/app" />} />
      <Route path="/app" element={<h1>App</h1>} />
      <Route
        path="/app/sesion"
        element={
          <AuthLayout
            transitionStage={transitionStage}
            onAnimationEnd={onAnimationEndAuth}
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
