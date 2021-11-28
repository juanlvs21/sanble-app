import { Routes, Route } from "react-router-dom";

import { SigninView } from "@/views/auth/Signin";

export const Router = () => (
  <Routes>
    <Route path="/auth/signin" element={<SigninView />} />
  </Routes>
);
