import React, {useEffect} from 'react';

import {Splash} from '@/components/common/Splash';
import {useData} from '@/hooks/useData';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const DataProvider: React.FC<ComponentProps> = ({children}) => {
  const {handleGetData, loading} = useData();

  useEffect(() => {
    setTimeout(() => {
      handleGetData();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Splash loading={loading}>{children}</Splash>;
};
