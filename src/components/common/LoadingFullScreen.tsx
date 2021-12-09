import { Backdrop, CircularProgress, Theme } from "@mui/material";

export type ComponentProps = {
  /**
   * Loading
   */
  loading: boolean;
};

export const LoadingFullScreen: React.FC<ComponentProps> = ({ loading }) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
    open={loading}
  >
    <CircularProgress color="primary" />
  </Backdrop>
);
