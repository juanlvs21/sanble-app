import React from 'react';
import {Spinner} from 'native-base';

import {useData} from '@/hooks/useData';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const DataProvider: React.FC<ComponentProps> = ({children}) => {
  const {isLoadingComplete} = useData();

  return isLoadingComplete ? children : <Spinner size="lg" />;
};
