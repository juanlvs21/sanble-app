import {useStateValue} from '@/context/app';

export const useAuth = () => {
  const [{auth}] = useStateValue();

  return {
    user: auth.user,
  };
};
