import React from 'react';

import {MainLayout} from '@/layouts/MainLayout';
import {Map} from '@/components/maps/Map';

export const NearYouScreen: React.FC = () => {
  return (
    <MainLayout contentPaddingHorizontal={0}>
      <Map withUserCurrentPosition />
    </MainLayout>
  );
};
