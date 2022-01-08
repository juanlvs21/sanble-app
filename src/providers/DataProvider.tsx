import React, {useEffect} from 'react';

import {WelcomeSlides} from '@/components/welcome/Slides';
import {useData} from '@/hooks/useData';
// import {useApp} from '@/hooks/useApp';

export type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const DataProvider: React.FC<ComponentProps> = ({children}) => {
  const {handleGetData} = useData();
  // const {handleSetHideWelcome} = useApp();

  useEffect(() => {
    // handleSetHideWelcome(false);
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WelcomeSlides>{children}</WelcomeSlides>;
};
