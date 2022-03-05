import { createContext, useContext, useReducer } from "react";

import { standsReducer, initialStandsState } from "./reducers/standsReducer";
import { TContextProps } from "@/types/TContext";
import { TStandsReducer } from "@/types/TContext";

export const StandsContext = createContext<TContextProps<TStandsReducer>>([
  initialStandsState,
  () => undefined,
]);

export type TStandsContextProps = {
  /**
   * Set initial state
   * @default initialStandsState
   */
  initialState?: TStandsReducer;
};
export const StandsProvider: React.FC<TStandsContextProps> = ({
  children,
  initialState = initialStandsState,
}) => {
  const [state, dispatch] = useReducer(standsReducer, initialState);

  return (
    <StandsContext.Provider value={[state, dispatch]}>
      {children}
    </StandsContext.Provider>
  );
};

export const useStandsStateValue = () => useContext(StandsContext);
