import { TopBar } from "@/components/common/TopBar";
import { useTopBarMain } from "@/hooks/useTopBarMain";

export const TopBarMain = () => {
  const { props } = useTopBarMain();

  return <TopBar {...props} />;
};
