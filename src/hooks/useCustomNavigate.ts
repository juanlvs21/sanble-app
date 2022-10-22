import {
  useLocation,
  useNavigate,
  NavigateFunction,
  NavigateOptions,
  To,
} from "react-router-dom";

export const useCustomNavigate = () => {
  const { pathname, search } = useLocation();
  const navigateReactRouter = useNavigate();

  return {
    navigate: (to: To, options?: NavigateOptions | undefined) =>
      `${pathname}${search}` != to ? navigateReactRouter(to, options) : null,
  };
};
