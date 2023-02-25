import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { isPlatform } from "@ionic/react";

import { LoadingSuspense } from "@/components/common/loaders/LoadingSuspense";
import { AuthLayout } from "@/components/layouts/Auth";
import { MainLayout } from "@/components/layouts/Main";
import { HomeLayout } from "@/components/layouts/Home";

const NotFoundScreen = lazy(() =>
  import("@/screens/NotFound").then(({ NotFound }) => ({ default: NotFound }))
);
const LandingScreen = lazy(() =>
  import("@/screens/Landing").then(({ Landing }) => ({ default: Landing }))
);
const WelcomeSlidesScreen = lazy(() =>
  import("@/screens/WelcomeSlides").then(({ WelcomeSlides }) => ({
    default: WelcomeSlides,
  }))
);
const SigninScreen = lazy(() =>
  import("@/screens/auth/Signin").then(({ Signin }) => ({ default: Signin }))
);
const SignupScreen = lazy(() =>
  import("@/screens/auth/Signup").then(({ Signup }) => ({ default: Signup }))
);
const HomeScreen = lazy(() =>
  import("@/screens/Home").then(({ Home }) => ({ default: Home }))
);
const FairsListScreen = lazy(() =>
  import("@/screens/fairs/FairsList").then(({ FairsList }) => ({
    default: FairsList,
  }))
);
const FairDetailsScreen = lazy(() =>
  import("@/screens/fairs/FairDetails").then(({ FairDetails }) => ({
    default: FairDetails,
  }))
);
const FairPhotoNewScreen = lazy(() =>
  import("@/screens/fairs/photo/FairPhotoNew").then(({ FairPhotoNew }) => ({
    default: FairPhotoNew,
  }))
);
const FairPhotoDetailsScreen = lazy(() =>
  import("@/screens/fairs/photo/FairPhotoDetails").then(
    ({ FairPhotoDetails }) => ({
      default: FairPhotoDetails,
    })
  )
);
const StandsListScreen = lazy(() =>
  import("@/screens/stands/StandsList").then(({ StandsList }) => ({
    default: StandsList,
  }))
);
const FavoritesListScreen = lazy(() =>
  import("@/screens/favorites/FavoritesList").then(({ FavoritesList }) => ({
    default: FavoritesList,
  }))
);
const NearYouScreen = lazy(() =>
  import("@/screens/NearYou").then(({ NearYou }) => ({
    default: NearYou,
  }))
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <>
              {isPlatform("capacitor") ? (
                <WelcomeSlidesScreen />
              ) : (
                <LandingScreen />
              )}
            </>
          }
        />
      </Route>
      <Route path="/app" element={<MainLayout />}>
        <Route path="" element={<HomeLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSuspense />}>
                <HomeScreen />
              </Suspense>
            }
          />
          <Route
            path="ferias"
            element={
              <Suspense fallback={<LoadingSuspense />}>
                <FairsListScreen />
              </Suspense>
            }
          />
          <Route
            path="stands"
            element={
              <Suspense fallback={<LoadingSuspense />}>
                <StandsListScreen />
              </Suspense>
            }
          />
          <Route
            path="productos"
            element={
              <Suspense fallback={<LoadingSuspense />}>
                <FavoritesListScreen />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="/app" element={<MainLayout />}>
        <Route
          path="favoritos"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen />
            </Suspense>
          }
        />
        <Route
          path="misanble"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen />
            </Suspense>
          }
        />
        <Route
          path="cerca"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <NearYouScreen />
            </Suspense>
          }
        />
        <Route
          path="perfil"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen />
            </Suspense>
          }
        />
        <Route
          path="/app/ferias/:fairID"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FairDetailsScreen />
            </Suspense>
          }
        />
        <Route
          path="/app/ferias/:fairID/foto"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FairPhotoNewScreen />
            </Suspense>
          }
        />
        <Route
          path="/app/ferias/:fairID/foto/:photoID"
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <FairPhotoDetailsScreen />
            </Suspense>
          }
        />
      </Route>
      <Route path="/app/sesion" element={<AuthLayout />}>
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
            <NotFoundScreen />
          </Suspense>
        }
      />
    </Routes>
  );
};
