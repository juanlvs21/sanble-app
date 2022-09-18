import { useEffect } from "react";
import type { Location } from "react-router-dom";

type ComponentProps = {
  setDisplayLocation: () => void;
};

const NotFound: React.FC<ComponentProps> = ({ setDisplayLocation }) => {
  useEffect(() => {
    setDisplayLocation();
  }, []);

  return <div>Página no encontrada</div>;
};

export default NotFound;
