import PullToRefresh from "react-simple-pull-to-refresh";

import { Metadata } from "@/components/common/Metadata";
import { useNative } from "@/hooks/useNative";

export type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
  /**
   * Title page
   */
  title?: string;
  /**
   * Handle refresh data
   */
  handleRefresh?: () => Promise<any>;
};

export const ViewContainer: React.FC<ComponentProps> = ({
  children,
  title,
  handleRefresh,
}) => {
  const { isNative } = useNative();

  return (
    <>
      <Metadata title={title} />
      {handleRefresh && isNative ? (
        <PullToRefresh onRefresh={handleRefresh}>{children}</PullToRefresh>
      ) : (
        children
      )}
    </>
  );
};
