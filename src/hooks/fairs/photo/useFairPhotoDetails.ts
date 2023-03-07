import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/immutable";

import { useToast } from "@/hooks/useToast";
import { getFairPhotoRequest } from "@/services";
import { TPhotograph } from "@/types/TPhotograph";

export const useFairPhotoDetails = (fairID: string, photoID: string) => {
  const { toast } = useToast();

  const modalRef = useRef<HTMLIonModalElement>(null);
  const [photograph, setPhotograph] = useState<TPhotograph>();
  const [ownerID, setOwnerID] = useState<string>();

  const { data, error, isLoading, mutate } = useSWRMutation(
    `/fairs/${fairID}/photograph/${photoID}`,
    async () => await getFairPhotoRequest(fairID, photoID)
  );

  useEffect(() => {
    if (data && !error) {
      setPhotograph(data.photograph);
      setOwnerID(data.ownerID);
    }
  }, [data]);

  useEffect(() => {
    if (error) toast(error, { type: "error" });
  }, [error]);

  return {
    modalRef,
    photograph,
    ownerID,
    isLoading,
    handleLoad: mutate,
  };
};
