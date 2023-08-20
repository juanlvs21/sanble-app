import { DocumentReference } from "firebase/firestore";

export type TPost = {
  id: string;
  text: string;
  creationTime: string;
  parent: DocumentReference;
  fileId?: string;
  fileUrl?: string;
  fileName?: string;
};

export type TPostForm = Pick<TPost, "text"> & {
  image?: string;
};
