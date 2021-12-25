import { styled, Box } from "@mui/system";
import { Chip, Skeleton, Typography } from "@mui/material";

const Card = styled(Box)({
  borderRadius: 20,
  backgroundColor: "#F4F7F8",
  padding: 8,
  margin: 5,
  display: "flex",
  height: 100,
});
const CoverSkeleton = styled(Skeleton)({
  width: 50,
  height: 50,
  marginLeft: 2,
  borderRadius: 20,
  "@media (min-width: 425px)": {
    width: 90,
    height: 90,
  },
});
const Content = styled("div")({
  padding: "0 15px",
  textAlign: "start",
  width: "100%",
});

export const CardSkeleton: React.FC = () => (
  <Card>
    <picture>
      <CoverSkeleton variant="rectangular" />
    </picture>
    <Content>
      <Skeleton variant="text" height={21} />
      <Skeleton variant="rectangular" height={60} />
    </Content>
  </Card>
);
