import { isPlatform } from "@ionic/react";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { SuspenseComponent } from "@/components/common/SuspenseComponent";
import { AuthLayout } from "@/components/layouts/Auth";
import { HomeLayout } from "@/components/layouts/Home";
import { MainLayout } from "@/components/layouts/Main";
import { ProvidersLayout } from "@/components/layouts/Providers";
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
  import("@/screens/fairs/FairPhotoNew").then(({ FairPhotoNew }) => ({
    default: FairPhotoNew,
  }))
);
const FairPhotoSlidesScreen = lazy(() =>
  import("@/screens/fairs/FairPhotoSlides").then(({ FairPhotoSlides }) => ({
    default: FairPhotoSlides,
  }))
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

const ErrorScreen = () => <h1 style={{ marginTop: 300 }}>Error :c :c</h1>;

export const router = createBrowserRouter([
  {
    path: ERoutesName.ROOT,
    element: <ProvidersLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        errorElement: <ErrorScreen />,
        element: isPlatform("capacitor") ? (
          <WelcomeSlidesScreen />
        ) : (
          <LandingScreen />
        ),
      },
      {
        path: ERoutesName.APP,
        errorElement: <ErrorScreen />,
        element: <MainLayout />,
        children: [
          {
            path: ERoutesName.APP,
            element: <HomeLayout />,
            children: [
              {
                index: true,
                errorElement: <ErrorScreen />,
                element: (
                  <SuspenseComponent>
                    <HomeScreen />
                  </SuspenseComponent>
                ),
              },
              {
                path: ERoutesName.FAIRS_LIST,
                errorElement: <ErrorScreen />,
                element: (
                  <SuspenseComponent>
                    <FairsListScreen />
                  </SuspenseComponent>
                ),
              },
              {
                path: ERoutesName.STANDS_LIST,
                errorElement: <ErrorScreen />,
                element: (
                  <SuspenseComponent>
                    <StandsListScreen />
                  </SuspenseComponent>
                ),
              },
            ],
          },
          {
            path: ERoutesName.FAVORITES_LIST,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FavoritesListScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.MY_SANBLE,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FavoritesListScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.NEAR_YOU,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <NearYouScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.PROFILE,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FavoritesListScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.FAIR_DETAILS,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FairDetailsScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.FAIR_DETAILS_PHOTO_SLIDES,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FairPhotoSlidesScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.FAIR_DETAILS_PHOTO_NEW,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <FairPhotoNewScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.STAND_DETAILS,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <StandDetailsScreen />
              </SuspenseComponent>
            ),
          },
        ],
      },
      {
        path: ERoutesName.SESSION,
        errorElement: <ErrorScreen />,
        element: <AuthLayout />,
        children: [
          {
            index: true,
            errorElement: <ErrorScreen />,
            element: (
              <Navigate to={ERoutesName.SESSION_SIGNIN} replace={true} />
            ),
          },
          {
            path: ERoutesName.SESSION_SIGNIN,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <SigninScreen />
              </SuspenseComponent>
            ),
          },
          {
            path: ERoutesName.SESSION_SIGNUP,
            errorElement: <ErrorScreen />,
            element: (
              <SuspenseComponent>
                <SignupScreen />
              </SuspenseComponent>
            ),
          },
        ],
      },
    ],
  },
]);
