import { IonRouterOutlet, IonSplitPane, isPlatform } from "@ionic/react";
import { lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";

import { LoadingSuspense } from "@/components/common/loaders/LoadingSuspense";
import { AuthLayout } from "@/components/layouts/Auth";
import { HomeLayout } from "@/components/layouts/Home";
import { MainLayout } from "@/components/layouts/Main";

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

export const AppRoutes = () => (
  <IonSplitPane contentId="main">
    <IonRouterOutlet id="main">
      {/* ------ LANDING ----- */}
      <Route
        path="/"
        exact
        render={(props) => (
          <Suspense fallback={<LoadingSuspense />}>
            <>
              {isPlatform("capacitor") ? (
                <WelcomeSlidesScreen {...props} />
              ) : (
                <LandingScreen {...props} />
              )}
            </>
          </Suspense>
        )}
      />

      <MainLayout>
        {/* ------ MAIN (SIDEBAR) ----- */}
        <Route
          path="/app/cerca"
          exact
          render={(props) => (
            <Suspense fallback={<LoadingSuspense />}>
              <NearYouScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/app/favoritos"
          exact
          render={(props) => (
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/app/misanble"
          exact
          render={(props) => (
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/app/cerca"
          exact
          render={(props) => (
            <Suspense fallback={<LoadingSuspense />}>
              <NearYouScreen {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/app/perfil"
          exact
          render={(props) => (
            <Suspense fallback={<LoadingSuspense />}>
              <FavoritesListScreen {...props} />
            </Suspense>
          )}
        />

        {/* ------ HOME ----- */}
        <Route
          path="/app"
          render={() => (
            <HomeLayout>
              <Route
                path="/app"
                exact
                render={(props) => (
                  <Suspense fallback={<LoadingSuspense />}>
                    <HomeScreen {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/app/ferias"
                exact
                render={(props) => (
                  <Suspense fallback={<LoadingSuspense />}>
                    <FairsListScreen {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/app/stands"
                exact
                render={(props) => (
                  <Suspense fallback={<LoadingSuspense />}>
                    <StandsListScreen {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/app/productos"
                exact
                render={(props) => (
                  <Suspense fallback={<LoadingSuspense />}>
                    <FavoritesListScreen {...props} />
                  </Suspense>
                )}
              />
            </HomeLayout>
          )}
        />
      </MainLayout>

      {/* ------ FAIR ----- */}
      <Route
        path="/app/ferias/:fairID"
        exact
        render={(props) => (
          <Suspense fallback={<LoadingSuspense />}>
            <FairDetailsScreen {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/app/ferias/:fairID/foto"
        exact
        render={(props) => (
          <Suspense fallback={<LoadingSuspense />}>
            <FairPhotoNewScreen {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/app/ferias/:fairID/foto/:photoID"
        exact
        render={(props) => (
          <Suspense fallback={<LoadingSuspense />}>
            <FairPhotoDetailsScreen {...props} />
          </Suspense>
        )}
      />

      {/* ------ SESSION ----- */}
      <Route
        path="/app/sesion"
        render={() => (
          <AuthLayout>
            <Route
              path="/app/sesion/entrar"
              exact
              render={(props) => (
                <Suspense fallback={<LoadingSuspense />}>
                  <SigninScreen {...props} />
                </Suspense>
              )}
            />
            <Route
              path="/app/sesion/registrarse"
              exact
              render={(props) => (
                <Suspense fallback={<LoadingSuspense />}>
                  <SignupScreen {...props} />
                </Suspense>
              )}
            />
            <Route
              path="/app/sesion"
              exact
              render={() => <Redirect to="/app/sesion/entrar" />}
            />
          </AuthLayout>
        )}
      />
    </IonRouterOutlet>
  </IonSplitPane>
);
