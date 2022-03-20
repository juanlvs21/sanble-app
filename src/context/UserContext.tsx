import { createContext, useContext, useReducer } from "react";

import { initialUserState, userReducer } from "@/context/reducers/userReducer";
import { TContextProps } from "@/types/TContext";
import { TUser } from "@/types/TUser";

export const UserContext = createContext<TContextProps<TUser>>([
  initialUserState,
  () => undefined,
]);

export type TUserContextProps = {
  /**
   * Set initial state
   * @default initialUserState
   */
  initialState?: TUser;
};
export const UserProvider: React.FC<TUserContextProps> = ({
  children,
  initialState = initialUserState,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStateValue = () => useContext(UserContext);
