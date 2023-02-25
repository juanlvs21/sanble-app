import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { isPlatform } from "@ionic/react";

import { SuspenseComponent } from "@/components/common/SuspenseComponent";
import { AuthLayout } from "@/components/layouts/Auth";
import { MainLayout } from "@/components/layouts/Main";
import { HomeLayout } from "@/components/layouts/Home";
import { ERoutesName } from "@/types/TRoutes";

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
const StandDetailsScreen = lazy(() =>
  import("@/screens/stands/StandDetails").then(({ StandDetails }) => ({
    default: StandDetails,
  }))
);
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ERoutesName.ROOT} element={<MainLayout />}>
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
      <Route path={ERoutesName.APP} element={<MainLayout />}>
        <Route path={ERoutesName.APP} element={<HomeLayout />}>
          <Route
            index
            element={
              <SuspenseComponent>
                <HomeScreen />
              </SuspenseComponent>
            }
          />
          <Route
            path={ERoutesName.FAIRS_LIST}
            element={
              <SuspenseComponent>
                <FairsListScreen />
              </SuspenseComponent>
            }
          />
          <Route
            path={ERoutesName.STANDS_LIST}
            element={
              <SuspenseComponent>
                <StandsListScreen />
              </SuspenseComponent>
            }
          />
          <Route
            path={ERoutesName.PRODUCTS_LIST}
            element={
              <SuspenseComponent>
                <FavoritesListScreen />
              </SuspenseComponent>
            }
          />
        </Route>
        <Route
          path={ERoutesName.FAVORITES_LIST}
          element={
            <SuspenseComponent>
              <FavoritesListScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.MY_SANBLE}
          element={
            <SuspenseComponent>
              <FavoritesListScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.NEAR_YOU}
          element={
            <SuspenseComponent>
              <NearYouScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.PROFILE}
          element={
            <SuspenseComponent>
              <FavoritesListScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.FAIR_DETAILS}
          element={
            <SuspenseComponent>
              <FairDetailsScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.FAIR_DETAILS_PHOTO_NEW}
          element={
            <SuspenseComponent>
              <FairPhotoNewScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.FAIR_DETAILS_PHOTO}
          element={
            <SuspenseComponent>
              <FairPhotoDetailsScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.STAND_DETAILS}
          element={
            <SuspenseComponent>
              <StandDetailsScreen />
            </SuspenseComponent>
          }
        />
      </Route>
      <Route path={ERoutesName.SESSION} element={<AuthLayout />}>
        <Route
          index
          element={<Navigate to={ERoutesName.SESSION_SIGNIN} replace />}
        />
        <Route
          path={ERoutesName.SESSION_SIGNIN}
          element={
            <SuspenseComponent>
              <SigninScreen />
            </SuspenseComponent>
          }
        />
        <Route
          path={ERoutesName.SESSION_SIGNUP}
          element={
            <SuspenseComponent>
              <SignupScreen />
            </SuspenseComponent>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <SuspenseComponent>
            <NotFoundScreen />
          </SuspenseComponent>
        }
      />
    </Routes>
  );
};
