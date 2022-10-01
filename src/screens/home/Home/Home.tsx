import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const Home: React.FC = () => {
  const { handleShowSidebar, showSidebar } = useApp();
  useDocumentTitle("Inicio");

  return (
    <div>
      <h1>App</h1>
      <button onClick={() => handleShowSidebar()}>
        {showSidebar ? "Hidden" : "Show"}
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
        gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
        dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor. Donec
        tristique consectetur nisl, sed consectetur turpis feugiat vitae.
        Pellentesque nec sapien odio. Curabitur maximus purus at massa
        ullamcorper blandit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
        gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
        dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor. Donec
        tristique consectetur nisl, sed consectetur turpis feugiat vitae.
        Pellentesque nec sapien odio. Curabitur maximus purus at massa
        ullamcorper blandit.
      </p>
    </div>
  );
};
