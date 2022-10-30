import { createContext, useContext, useReducer } from "react";

import { initialUserState, authReducer } from "@/context/reducers/authReducer";
import { TContextProps } from "@/types/TContext";
import { TAuth } from "@/types/TAuth";

export const AuthContext = createContext<TContextProps<TAuth>>([
  initialUserState,
  () => undefined,
]);

export type TAuthProps = {
  /**
   * Set initial state
   * @default initialUserState
   */
  initialState?: TAuth;
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const AuthProvider: React.FC<TAuthProps> = ({
  children,
  initialState = initialUserState,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
