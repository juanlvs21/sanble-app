import React from 'react';
import {ISkeletonProps, Skeleton as SkeletonNB} from 'native-base';

import {gray} from '@/constants/Colors';

export const Skeleton: React.FC<ISkeletonProps> = ({
  startColor = gray[500],
  endColor = gray[600],
  ...props
}) => <SkeletonNB startColor={startColor} endColor={endColor} {...props} />;
