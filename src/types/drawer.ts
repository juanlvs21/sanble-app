export type TDrawerItemScreen =
  | 'Root'
  | 'MySanble'
  | 'Favorites'
  | 'NearYou'
  | 'Messages'
  | 'Profile';

export type TDrawerItem = {
  label: string;
  icon: React.ReactElement;
  screen: TDrawerItemScreen;
};
