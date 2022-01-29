import {TFairType} from '@/types/fair';

const typeFriendly = {
  entrepreneurship: 'Emprendimiento',
  gastronomic: 'Gastronomica',
};

export const fairTypeFriendly = (type: TFairType): string =>
  typeFriendly[type || 'entrepreneurship'];
