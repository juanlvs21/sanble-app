import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { FiHome } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { RiUserLine, RiRoadMapLine } from "react-icons/ri";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
const Logo = styled("img")({
  height: 25,
});

export const DrawerDesktop: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
      open
    >
      <StyledToolbar>
        <Logo src="/img/logo_text.svg" alt="Sanble" />
      </StyledToolbar>
      <Divider />
      <List>
        <StyledLink to="/in">
          <ListItem button>
            <ListItemIcon>
              <FiHome />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/in/near-you">
          <ListItem button>
            <ListItemIcon>
              <RiRoadMapLine />
            </ListItemIcon>
            <ListItemText primary="Cerca de ti" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/in/fairs">
          <ListItem button>
            <ListItemIcon>
              <MdStorefront />
            </ListItemIcon>
            <ListItemText primary="Ferias" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/in/stands">
          <ListItem button>
            <ListItemIcon>
              <BiShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Stands" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/in/profile">
          <ListItem button>
            <ListItemIcon>
              <RiUserLine />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
        </StyledLink>
      </List>
    </Drawer>
  );
};
