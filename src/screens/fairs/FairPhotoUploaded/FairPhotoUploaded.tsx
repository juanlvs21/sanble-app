import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { ImageExtended } from "@/components/common/ImageExtended";
import { TopBar } from "@/components/common/TopBar";
import { imageKitURL } from "@/helpers/imageKit";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./FairPhotoUploaded.module.css";
import { useEffect } from "react";

export const FairPhotoUploaded = () => {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const photoName = searchParams.get("n") ?? "";

  useEffect(() => {
    if (!photoName) navigate("/app/ferias");
  }, []);

  return (
    <>
      <TopBar
        title="Fotografía"
        start={
          <Button
            onClick={() =>
              state?.fairID
                ? navigate(`/app/ferias/${state?.fairID}`)
                : navigate("/app/ferias")
            }
          >
            <IoIosArrowBack size={24} />
          </Button>
        }
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <ImageExtended
        src={`${imageKitURL}${photoName}`}
        alt={photoName}
        classNamePicture={styles.photoUploadedPicture}
        className={styles.photoUploadedImg}
        skeletonProps={{
          className: styles.photoUploadedImg,
        }}
      />
    </>
  );
};
