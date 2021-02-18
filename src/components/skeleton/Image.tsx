import React from "react";
import { IonSkeletonText, IonThumbnail } from "@ionic/react";

interface ContainerProps {
  className?: string;
}

const Image: React.FC<ContainerProps> = ({ className = "" }) => (
  <IonThumbnail slot="start" className={className}>
    <IonSkeletonText animated />
  </IonThumbnail>
);

export default Image;
