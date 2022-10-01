import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoadingSuspense } from "@/components/common/loaders/LoadingSuspense";
import { AuthLayout } from "@/components/layouts/Auth";
import { MainLayout } from "@/components/layouts/Main";
import { useTransitionsScreen } from "@/hooks/useTransitionsScreen";

const NotFoundScreen = lazy(() =>
  import("@/screens/NotFound").then(({ NotFound }) => ({ default: NotFound }))
);
const LandingScreen = lazy(() =>
  import("@/screens/Landing").then(({ Landing }) => ({ default: Landing }))
);
const SigninScreen = lazy(() =>
  import("@/screens/auth/Signin").then(({ Signin }) => ({ default: Signin }))
);
const SignupScreen = lazy(() =>
  import("@/screens/auth/Signup").then(({ Signup }) => ({ default: Signup }))
);
const HomeScreen = lazy(() =>
  import("@/screens/home/Home").then(({ Home }) => ({ default: Home }))
);
const FavoritesListScreen = lazy(() =>
  import("@/screens/favorites/FavoritesList").then(({ FavoritesList }) => ({
    default: FavoritesList,
  }))
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
      <Route
        path="/"
        element={
          <LandingScreen
            onAnimationEnd={onAnimationEnd}
            transitionStage={transitionStage}
          />
        }
      />
      <Route
        path="/app"
        element={
          <MainLayout
            onAnimationEnd={onAnimationEnd}
            transitionStage={transitionStage}
          />
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="favoritos"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/app/sesion"
        element={
          <AuthLayout
            onAnimationEnd={onAnimationEnd}
            transitionStage={transitionStage}
          />
        }
      >
        <Route index element={<Navigate to="/app/sesion/entrar" replace />} />
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
