import { useEffect } from "react";

type ComponentProps = {
  /**
   * Function to set location in displayLocation
   */
  setDisplayLocation: () => void;
};

export const NotFound: React.FC<ComponentProps> = ({ setDisplayLocation }) => {
  useEffect(() => {
    setDisplayLocation();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      Página no encontrada
    </div>
  );
};
