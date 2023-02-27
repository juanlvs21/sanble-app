import { Suspense } from "react";

import { LoadingSuspense } from "@/components/common/loaders/LoadingSuspense";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
  /**
   * Loading Suspense Component
   */
  LoadingComponent?: () => JSX.Element;
};

export const SuspenseComponent = ({
  children,
  LoadingComponent = LoadingSuspense,
}: ComponentProps) => (
  <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
);
