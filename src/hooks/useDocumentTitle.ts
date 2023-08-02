import { useRef, useEffect } from "react";

export const useDocumentTitleApp = (
  title: string,
  prevailOnUnmount = false
) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} | Sanble`;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
};
