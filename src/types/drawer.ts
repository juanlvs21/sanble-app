export type TDrawerItemScreen =
  | 'HomeBottomNav'
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
