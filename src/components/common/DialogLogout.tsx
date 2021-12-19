import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

import { useAuth } from "@/hooks/useAuth";

export type ComponentProps = {
  /**
   * Show dialog
   */
  open: boolean;
  /**
   * Close dialog
   */
  onClose: () => void;
};

export const DialogLogout: React.FC<ComponentProps> = ({ open, onClose }) => {
  const { handleLogout } = useAuth();

  const onLogout = () => {
    handleLogout().finally(onClose);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-confirm-logout-title"
    >
      <DialogTitle id="alert-confirm-logout-title">
        ¿Estás seguro de cerrar sesión?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onLogout} autoFocus>
          Cerrar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};
