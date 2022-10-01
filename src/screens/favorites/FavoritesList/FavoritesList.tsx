import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const FavoritesList: React.FC = () => {
  const { handleShowSidebar, showSidebar } = useApp();
  useDocumentTitle("Lista de Favoritos");

  return (
    <div>
      <h1>Lista de favoritos</h1>
      <button onClick={() => handleShowSidebar()}>
        {showSidebar ? "Hidden" : "Show"}
      </button>
      <ul>
        <li>Favorito 1</li>
        <li>Favorito 2</li>
        <li>Favorito 3</li>
        <li>Favorito 4</li>
        <li>Favorito 5</li>
        <li>Favorito 6</li>
        <li>Favorito 7</li>
        <li>Favorito 8</li>
        <li>Favorito 9</li>
        <li>Favorito 10</li>
      </ul>
    </div>
  );
};
