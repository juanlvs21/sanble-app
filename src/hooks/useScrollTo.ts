import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type THookScrollTo = {
  searchParamName?: string;
  canScrollTo?: boolean;
};

export const useScrollTo = <T = HTMLDivElement>({
  searchParamName,
  canScrollTo,
}: THookScrollTo) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollKey] = useState(
    searchParams.get(searchParamName ?? "") ?? undefined
  );
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    if (canScrollTo && scrollRef?.current) {
      (scrollRef.current as any).scrollIntoView({ behavior: "smooth" });
      if (searchParamName)
        setSearchParams((params) => {
          params.delete(searchParamName);
          return params;
        });
    }
  }, [
    canScrollTo,
    scrollRef,
    searchParams,
    searchParamName,
    searchParams.get(searchParamName ?? ""),
  ]);

  return {
    scrollRef,
    scrollKey,
  };
};
