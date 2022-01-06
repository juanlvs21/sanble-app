// Types
import {TAction, TStateContext} from '@/types/context';

// Context
import {appReducer} from '@/context/reducers/appReducer';
import {authReducer} from '@/context/reducers/authReducer';
import {fairsReducer} from '@/context/reducers/fairsReducer';
import {standsReducer} from '@/context/reducers/standsReducer';
import {mapsReducer} from '@/context/reducers/mapsReducer';

export const mainReducer = (
  {app, auth, fairs, stands, maps}: TStateContext,
  action: TAction,
) => ({
  app: appReducer(app, action),
  auth: authReducer(auth, action),
  fairs: fairsReducer(fairs, action),
  stands: standsReducer(stands, action),
  maps: mapsReducer(maps, action),
});
