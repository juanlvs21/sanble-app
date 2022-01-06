import React, {useEffect} from 'react';

import {WelcomeSwipe} from '@/components/welcome/Swipe';
import {useData} from '@/hooks/useData';
import {useApp} from '@/hooks/useApp';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const DataProvider: React.FC<ComponentProps> = ({children}) => {
  const {handleGetData} = useData();
  const {showWelcome} = useApp();

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showWelcome ? <WelcomeSwipe /> : children;
};
