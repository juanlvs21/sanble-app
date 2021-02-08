import React, { useState, useRef } from "react";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";

// Styles
import styles from "./Update.module.css";

// Images
import profile from "../../assets/images/profile.png";

interface ContainerProps {
  handleSelectFile: Function;
  loading?: boolean;
}

const Update: React.FC<ContainerProps> = ({ handleSelectFile, loading }) => {
  const fileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState<File>();

  const handleClick = () => {
    const file: any = fileInput?.current;
    if (file) file.click();
  };

  const onSelectFile = (e: any) => {
    const file: File =
      (e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File);

    setImagePreview(file);
    handleSelectFile(file);
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={imagePreview ? URL.createObjectURL(imagePreview) : profile}
        alt="Profile"
      />
      {loading ? (
        <div className={styles.loader_container}>
          <div className={styles.loader} />
        </div>
      ) : (
        <div
          className={styles.hover_click_photo}
          role="button"
          onClick={handleClick}
        >
          <IonIcon
            icon={addCircleOutline}
            className={styles.icon}
            color="primary"
          />
        </div>
      )}
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/*"
        onChange={onSelectFile}
      />
    </div>
  );
};

export default Update;
