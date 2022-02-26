import { createContext, useContext, useReducer } from "react";

import { fairsReducer, initialFairsState } from "./reducers/fairsReducer";
import { TContextProps } from "../types/TContext";
import { TFairsReducer } from "../types/TContext";

export const FairsContext = createContext<TContextProps<TFairsReducer>>([
  initialFairsState,
  () => undefined,
]);

export type TFairsContextProps = {
  /**
   * Set initial state
   * @default initialFairsState
   */
  initialState?: TFairsReducer;
};
export const FairsProvider: React.FC<TFairsContextProps> = ({
  children,
  initialState = initialFairsState,
}) => {
  const [state, dispatch] = useReducer(fairsReducer, initialState);

  return (
    <FairsContext.Provider value={[state, dispatch]}>
      {children}
    </FairsContext.Provider>
  );
};

export const useFairsContext = () => useContext(FairsContext);
