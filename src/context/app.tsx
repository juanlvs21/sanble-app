import React, {createContext, useContext, useReducer} from 'react';

import {initialAppState} from '@/context/reducers/appReducer';
import {initialAuthState} from '@/context/reducers/authReducer';
import {initialFairsState} from '@/context/reducers/fairsReducer';
import {initialStandsState} from '@/context/reducers/standsReducer';

import {mainReducer} from '@/context/reducers';

import {TContextProps, TStateContext} from '@/types/context';

export const initialState: TStateContext = {
  app: initialAppState,
  auth: initialAuthState,
  fairs: initialFairsState,
  stands: initialStandsState,
};

export const AppContext = createContext<TContextProps>([
  initialState,
  () => undefined,
]);

export const AppProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const useStateValue = () => useContext(AppContext);
