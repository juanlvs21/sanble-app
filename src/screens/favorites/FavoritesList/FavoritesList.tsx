import { useLocation } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const FavoritesList = () => {
  const { pathname } = useLocation();
  const { handleShowSidebar, showSidebar } = useApp();
  useDocumentTitle("Lista de Favoritos");

  return (
    <div>
      <h1>{pathname}</h1>
      <button onClick={() => handleShowSidebar()}>
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
        gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
        dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor. Donec
        tristique consectetur nisl, sed consectetur turpis feugiat vitae.
        Pellentesque nec sapien odio. Curabitur maximus purus at massa
        ullamcorper blandit.
      </p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
        <li>Item 9</li>
        <li>Item 10</li>
      </ul>
    </div>
  );
};
