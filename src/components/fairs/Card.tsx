import { styled, Box } from "@mui/system";

import { TFair } from "@/types/Fairs";
import { getFairCover } from "@/helpers/getFairCover";

const Card = styled(Box)({
  borderRadius: 20,
  backgroundColor: "#F4F7F8",
  padding: 20,
  margin: 5,
});
const Cover = styled("img")({
  width: 50,
  height: 50,
});

export type ComponentProps = {
  /**
   * Fair details
   */
  fair: TFair;
};

export const FairCard: React.FC<ComponentProps> = ({ fair }) => {
  return (
    <Card>
      <picture>
        <Cover src={getFairCover(fair.photographs)} alt={fair.name} />
      </picture>
      <div>{fair.name}</div>
    </Card>
  );
};
