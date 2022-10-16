import { BiBell } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { TopBar } from "@/components/common/TopBar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
// import styles from "./Home.module.css";

export const Home: React.FC = () => {
  useDocumentTitle("Inicio");

  return (
    <>
      <TopBar
        title="Sanble"
        end={
          <Button>
            {/* <span className={styles.notificationBadge} />  */}
            {/* TODO: Enable this when notifications are working */}
            <BiBell size={24} />
          </Button>
        }
        startUser
        sticky
      />
      <div>
        <h1>App</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          blandit venenatis orci et imperdiet. Nunc lacus turpis, lobortis id
          gravida et, aliquet at quam. Donec sagittis tellus ut turpis ultrices
          dictum. In mauris purus, feugiat eu aliquet a, vehicula nec dolor.
          Donec tristique consectetur nisl, sed consectetur turpis feugiat
          vitae. Pellentesque nec sapien odio. Curabitur maximus purus at massa
          ullamcorper blandit.
        </p>
      </div>
    </>
  );
};
