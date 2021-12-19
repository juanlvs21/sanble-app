import { useState } from "react";
import { Link } from "react-router-dom";
import { styled, Box } from "@mui/system";
import { AppBar, Badge, IconButton, Toolbar, Tooltip } from "@mui/material";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { BiBell } from "react-icons/bi";

import { SearchInput } from "@/components/common/SearchInput";
import { DialogLogout } from "@/components/common/DialogLogout";
import { useAuth } from "@/hooks/useAuth";

const NavBar = styled(AppBar)({
  backgroundColor: "#fff",
  boxShadow: "none",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
});

export const NavbarDesktop: React.FC = () => {
  const { logged } = useAuth();
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <NavBar position="static">
          <Toolbar>
            <SearchInput />
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "flex" } }}>
              {logged ? (
                <>
                  <Tooltip title="Notificaciones" placement="bottom">
                    <IconButton size="large" color="inherit">
                      <Badge color="primary" variant="dot">
                        <BiBell size={25} color="rgba(0, 0, 0, 0.54)" />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cerrar sesión" placement="bottom">
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => setOpenLogout(true)}
                    >
                      <AiOutlineLogout size={25} color="rgba(0, 0, 0, 0.54)" />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Iniciar sesión" placement="bottom">
                  <Link to="/auth/signin">
                    <IconButton size="large" color="inherit">
                      <AiOutlineLogin size={25} color="rgba(0, 0, 0, 0.54)" />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </NavBar>
      </Box>

      <DialogLogout open={openLogout} onClose={() => setOpenLogout(false)} />
    </>
  );
};
