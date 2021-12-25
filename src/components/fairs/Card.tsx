import { Link } from "react-router-dom";
import { styled, Box } from "@mui/system";
import { Chip, Typography } from "@mui/material";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";

import { TFair } from "@/types/Fairs";
import { getFairCover } from "@/helpers/getFairCover";
import { dateFormat } from "@/helpers/dateFormat";

const Card = styled(Box)({
  borderRadius: 20,
  backgroundColor: "#F4F7F8",
  padding: 8,
  margin: 5,
  display: "flex",
  height: 100,
  transition: "all 400ms ease-in-out",

  "&:hover": {
    cursor: "pointer",
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.2)",
    "-webkit-box-shadow": "3px 3px 5px 0px rgba(0,0,0,0.2)",
  },
});
const Cover = styled("img")({
  width: 50,
  height: 50,
  borderRadius: 20,
  marginLeft: 2,
  objectFit: "cover",
  objectPosition: "center",
  "@media (min-width: 425px)": {
    width: 90,
    height: 90,
  },
});
const Content = styled("div")({
  padding: "0 15px",
  textAlign: "start",
});
const Title = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: "var(--sb-black)",
  "@media (min-width: 768px)": {
    fontSize: 14,
  },
});
const Description = styled(Typography)({
  fontSize: 10,
  fontWeight: 500,
  color: "var(--sb-black)",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-line-clamp": "1!important",
  "-webkit-box-orient": "vertical",
  "@media (min-width: 768px)": {
    fontSize: 12,
  },
  "@media (min-width: 320px)": {
    "-webkit-line-clamp": "2!important",
  },
});
const ChipStyled = styled(Chip)({
  height: 20,
  fontSize: 9,
  marginRight: 5,
  marginTop: 5,
  cursor: "pointer",
  "@media (min-width: 425px)": {
    height: 24,
    fontSize: 11,
  },
});

export type ComponentProps = {
  /**
   * Fair details
   */
  fair: TFair;
};

export const FairCard: React.FC<ComponentProps> = ({ fair }) => (
  <Link to={`/in/fairs/${fair.uuid}`}>
    <Card>
      <picture>
        <Cover src={getFairCover(fair.photographs)} alt={fair.name} />
      </picture>
      <Content>
        <Title>{fair.name}</Title>
        <Description variant="body1">{fair.description}</Description>
        <ChipStyled
          icon={<HiOutlineCalendar />}
          label={dateFormat(fair.date_time, "DD MMM")}
          color="primary"
        />
        <ChipStyled
          icon={<HiOutlineClock />}
          label={dateFormat(fair.date_time, "HH:mm a")}
          color="primary"
        />
      </Content>
    </Card>
  </Link>
);
