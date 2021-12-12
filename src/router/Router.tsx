import { Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout } from "@/layouts/Auth";
import { MainLayout } from "@/layouts/Main";
import { Landing } from "@/views/Landing";
import { Home } from "@/views/Home";
import { SigninView } from "@/views/auth/Signin";
import { SignupView } from "@/views/auth/Signup";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/in" element={<MainLayout />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<Navigate to="/auth/signin" replace />} />
      <Route path="signin" element={<SigninView />} />
      <Route path="signup" element={<SignupView />} />
    </Route>
    <Route path="*" element={<h1>NOT FOUND</h1>} />
  </Routes>
);

// https://ui.dev/react-router-code-splitting/
