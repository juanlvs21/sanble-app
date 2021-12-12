import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { BiBell } from "react-icons/bi";

const Nav = styled("nav")({
  width: "100%",
  height: 60,
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 30,
});
const NavSection = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "20px 40px",
});
const Logo = styled("img")({
  height: 45,
});
const ButtonIcon = styled(IconButton)({
  marginTop: 12,
  backgroundColor: "#f4f7f8",
});

export const NavbarMobile: React.FC = () => {
  return (
    <Nav>
      <NavSection>
        <Logo src="/img/logo_text.svg" alt="Sanble" />
      </NavSection>
      <NavSection>
        <ButtonIcon aria-label="Notificaciones">
          <Badge color="primary" variant="dot">
            <BiBell size={30} />
          </Badge>
        </ButtonIcon>
      </NavSection>
    </Nav>
  );
};
