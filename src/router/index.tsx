import { IonRouterOutlet, IonSplitPane, isPlatform } from "@ionic/react";
import { lazy } from "react";
import { Redirect, Route } from "react-router-dom";

// import {NotFound} from "@/screens/NotFound"
import { FairDetails } from "@/screens/fairs/FairDetails";
import { FairsList } from "@/screens/fairs/FairsList";
import { FairPhotoDetails } from "@/screens/fairs/photo/FairPhotoDetails";
import { FairPhotoNew } from "@/screens/fairs/photo/FairPhotoNew";
import { FavoritesList } from "@/screens/favorites/FavoritesList";
import { Home } from "@/screens/Home";
import { NearYou } from "@/screens/NearYou";
import { StandDetails } from "@/screens/stands/StandDetails";
import { StandsList } from "@/screens/stands/StandsList";

const MainLayout = lazy(() =>
  import("@/components/layouts/Main").then(({ MainLayout }) => ({
    default: MainLayout,
  }))
);
const HomeLayout = lazy(() =>
  import("@/components/layouts/Home").then(({ HomeLayout }) => ({
    default: HomeLayout,
  }))
);
const AuthLayout = lazy(() =>
  import("@/components/layouts/Auth").then(({ AuthLayout }) => ({
    default: AuthLayout,
  }))
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

export const AppRoutes = () => (
  <IonSplitPane contentId="main">
    <IonRouterOutlet id="main">
      {/* ------ LANDING ----- */}
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            {isPlatform("capacitor") ? (
              <WelcomeSlidesScreen {...props} />
            ) : (
              <LandingScreen {...props} />
            )}
          </>
        )}
      />

      <Route
        path="/app"
        render={() => (
          <MainLayout>
            {/* ------ MAIN (SIDEBAR) ----- */}
            <Route
              path="/app/favoritos"
              exact
              render={(props) => <FavoritesList {...props} />}
            />
            <Route
              path="/app/misanble"
              exact
              render={(props) => <FavoritesList {...props} />}
            />
            <Route
              path="/app/cerca"
              exact
              render={(props) => <NearYou {...props} />}
            />
            <Route
              path="/app/perfil"
              exact
              render={(props) => <FavoritesList {...props} />}
            />

            {/* ------ HOME ----- */}
            <Route
              path="/app"
              render={() => (
                <HomeLayout>
                  <Route
                    path="/app/inicio"
                    exact
                    render={(props) => <Home {...props} />}
                  />
                  <Route
                    path="/app/ferias"
                    exact
                    render={(props) => <FairsList {...props} />}
                  />
                  <Route
                    path="/app/stands"
                    exact
                    render={(props) => <StandsList {...props} />}
                  />
                  <Route
                    path="/app/productos"
                    exact
                    render={(props) => <FavoritesList {...props} />}
                  />
                  <Route
                    path="/app"
                    exact
                    render={() => <Redirect to="/app/inicio" />}
                  />
                </HomeLayout>
              )}
            />

            {/* ------ FAIR ----- */}
            <Route
              path="/app/ferias/:fairID"
              exact
              render={(props) => <FairDetails {...props} />}
            />
            <Route
              path="/app/ferias/:fairID/foto"
              exact
              render={(props) => <FairPhotoNew {...props} />}
            />
            <Route
              path="/app/ferias/:fairID/foto/:photoID"
              exact
              render={(props) => <FairPhotoDetails {...props} />}
            />

            {/* ------ FAIR ----- */}
            <Route
              path="/app/stands/:standID"
              exact
              render={(props) => <StandDetails {...props} />}
            />
          </MainLayout>
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
              render={(props) => <SigninScreen {...props} />}
            />
            <Route
              path="/app/sesion/registrarse"
              exact
              render={(props) => <SignupScreen {...props} />}
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
