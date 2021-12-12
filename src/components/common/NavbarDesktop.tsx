import { styled, Box } from "@mui/system";
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import { BiBell } from "react-icons/bi";

import { SearchInput } from "@/components/common/SearchInput";

const NavBar = styled(AppBar)({
  backgroundColor: "#fff",
  boxShadow: "none",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
});

export const NavbarDesktop: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar position="static">
        <Toolbar>
          <SearchInput />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="primary" variant="dot">
                <BiBell size={25} color="rgba(0, 0, 0, 0.54)" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </NavBar>
    </Box>
  );
};
