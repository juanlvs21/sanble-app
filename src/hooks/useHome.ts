import {useState} from 'react';

import {useFairs} from './useFairs';

export const useHome = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const {getRecentFairs, fairs} = useFairs();

  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([getRecentFairs()]);
    setLoading(false);
  };

  return {
    handleRefresh,
    loading,
    fairs,
  };
};
