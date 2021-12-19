import { Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout } from "@/layouts/Auth";
import { MainLayout } from "@/layouts/Main";
import { SigninView } from "@/views/auth/Signin";
import { SignupView } from "@/views/auth/Signup";
import { Landing } from "@/views/Landing";
import { Home } from "@/views/Home";
import { NearYou } from "@/views/NearYou";
import { FairsList } from "@/views/fairs/FairsList";
import { StandsList } from "@/views/stands/StandsList";
import { ProfileDetails } from "@/views/profile/ProfileDetails";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/in" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="near-you" element={<NearYou />} />
      <Route path="fairs">
        <Route index element={<FairsList />} />
      </Route>
      <Route path="stands">
        <Route index element={<StandsList />} />
      </Route>
      <Route path="profile">
        <Route index element={<ProfileDetails />} />
      </Route>
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<Navigate to="/auth/signin" replace />} />
      <Route path="signin" element={<SigninView />} />
      <Route path="signup" element={<SignupView />} />
    </Route>
    <Route path="*" element={<h1>NOT FOUND</h1>} />
  </Routes>
);
// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/lazy-loading?file=src/App.tsx
// https://ui.dev/react-router-code-splitting/
