import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {gray} from '../../constants/Colors';

type ComponentProps = {
  /**
   * Determines component's children.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Determines the color of placeholder.
   *
   * @default gray[50]
   */
  backgroundColor?: string;
  /**
   * Determines the highlight color of placeholder.
   *
   * @default gray[500]
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. Use 0 to disable animation
   * @default 800
   */
  speed?: number;
  /**
   * Determines the animation direction, left or right
   * @default right
   */
  direction?: 'left' | 'right';
};

export const Skeleton: React.FC<ComponentProps> = ({
  children,
  backgroundColor = gray[50],
  highlightColor = gray[500],
  ...props
}) => (
  <SkeletonPlaceholder
    backgroundColor={backgroundColor}
    highlightColor={highlightColor}
    {...props}>
    {children}
  </SkeletonPlaceholder>
);

export const SkeletonItem = SkeletonPlaceholder.Item;
