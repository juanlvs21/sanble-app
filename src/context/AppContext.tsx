import { createContext, useContext, useReducer } from "react";

import { initialAppState, appReducer } from "@/context/reducers/appReducer";
import { TContextProps } from "@/types/TContext";
import { TApp } from "@/types/TApp";

export const AppContext = createContext<TContextProps<TApp>>([
  initialAppState,
  () => undefined,
]);

export type TAppContextProps = {
  /**
   * Set initial state
   * @default initialAppState
   */
  initialState?: TApp;
};
export const AppProvider: React.FC<TAppContextProps> = ({
  children,
  initialState = initialAppState,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStateValue = () => useContext(AppContext);
