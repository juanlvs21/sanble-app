import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { EColors } from "@/helpers/colors";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useStatusBar } from "@/hooks/useStatusBar";

export const FairDetails: React.FC = () => {
  const { fairID } = useParams();
  const { backgroundStatusBar } = useStatusBar();
  useDocumentTitle("Feria");

  useEffect(() => {
    backgroundStatusBar(EColors.PRIMARY);
  }, []);

  return (
    <div>
      {/* <div>
        <img src="" alt="" />
      </div> */}
      <h1>details {fairID}</h1>
    </div>
  );
};
