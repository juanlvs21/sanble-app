import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "@/components/layouts/Auth";
import { LoadingSuspense } from "@/components/common/loaders/LoadingSuspense";
import { useTransitionsScreen } from "@/hooks/useTransitionsScreen";

const NotFoundScreen = lazy(() =>
  import("@/screens/NotFound").then(({ NotFound }) => ({ default: NotFound }))
);
const SigninScreen = lazy(() =>
  import("@/screens/auth/Signin").then(({ Signin }) => ({ default: Signin }))
);
const SignupScreen = lazy(() =>
  import("@/screens/auth/Signup").then(({ Signup }) => ({ default: Signup }))
);

export const AppRoutes: React.FC = () => {
  const {
    setDefaultLocation,
    displayLocation,
    onAnimationEnd,
    transitionStage,
  } = useTransitionsScreen();

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Navigate to="/app" />} />
      <Route path="/app" element={<h1>App</h1>} />
      <Route
        path="/app/sesion"
        element={
          <AuthLayout
            onAnimationEnd={onAnimationEnd}
            transitionStage={transitionStage}
          />
        }
      >
        <Route
          index
          element={<Navigate to="/app/sesion/registrarse" replace />}
        />
        <Route
          path="entrar"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <SigninScreen />
            </Suspense>
          }
        />
        <Route
          path="registrarse"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <SignupScreen />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingSuspense />}>
            <NotFoundScreen setDisplayLocation={setDefaultLocation} />
          </Suspense>
        }
      />
    </Routes>
  );
};
