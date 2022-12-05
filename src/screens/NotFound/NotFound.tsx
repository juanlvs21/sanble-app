import { useEffect } from "react";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export type ComponentProps = {
  /**
   * Function to set location in displayLocation
   */
  setDisplayLocation: () => void;
};

export const NotFound: React.FC<ComponentProps> = ({ setDisplayLocation }) => {
  useDocumentTitle("¡Ups! Página no encontrada 😢");

  useEffect(() => {
    setDisplayLocation();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      Página no encontrada
    </div>
  );
};
