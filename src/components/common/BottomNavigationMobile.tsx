import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FiHome } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { RiUserLine, RiRoadMapLine } from "react-icons/ri";

import { useAuth } from "@/hooks/useAuth";

type TValueTab = "home" | "near-you" | "fairs" | "stands" | "profile";

const NavigationContainer = styled("nav")({
  position: "fixed",
  left: 0,
  bottom: 10,
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
const NavigationTab = styled(BottomNavigationAction)({
  minWidth: 50,
  "@media(min-width:360px)": {
    minWidth: 70,
  },
});

export const BottomNavigationMobile = () => {
  const navigate = useNavigate();
  const { logged } = useAuth();
  const [value, setValue] = useState<TValueTab>("home");

  const handleChange = (_: any, newValue: TValueTab) => {
    setValue(newValue);
    if (newValue === "home") navigate("/in");
    else navigate(`/in/${newValue}`);
  };

  return (
    <NavigationContainer>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <NavigationTab value="home" icon={<FiHome size={25} />} />
        <NavigationTab value="near-you" icon={<RiRoadMapLine size={25} />} />
        <NavigationTab value="fairs" icon={<MdStorefront size={25} />} />
        <NavigationTab value="stands" icon={<BiShoppingBag size={25} />} />
        {logged && (
          <NavigationTab value="profile" icon={<RiUserLine size={25} />} />
        )}
      </BottomNavigation>
    </NavigationContainer>
  );
};
