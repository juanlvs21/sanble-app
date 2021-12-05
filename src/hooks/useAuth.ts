import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { signupRequest } from "@/helpers/api";
import { auth } from "@/helpers/firebase";
import { messageErrors } from "@/helpers/messageErrors";
import { TUserSignup } from "@/types/TUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (userForm: TUserSignup) => {
    setLoading(true);

    try {
      await signupRequest(userForm);
      const { user } = await signInWithEmailAndPassword(
        auth,
        userForm.email,
        userForm.password
      );

      console.log({ user });
      // navigate("/in");
    } catch (error) {
      setLoading(false);
      messageErrors(error).map((err) => {
        toast(err, { type: "error" });
      });
    }
  };

  return {
    loading,
    handleSignup,
  };
};
