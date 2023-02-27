import { mutate } from "swr";

import { TFair, TFairGeo } from "@/types/TFair";
import { TPhotograph } from "@/types/TPhotograph";

export const useFairPhotoRevalidate = (fairID: string) => {
  const useSWRFairsList = "/fairs";
  const useSWRFairsBestList = "/fairs/best";
  const useSWRFairDetails = `/fairs/${fairID}`;

  const handleRevalidateListsNew = async (newPhoto: TPhotograph) => {
    await mutate(useSWRFairsList, (data: any) => ({
      ...data,
      list: (data.list as TFair[]).map((fair) =>
        fair.id === fairID ? { ...fair, coverUrl: newPhoto.url } : fair
      ),
    }));

    await mutate(useSWRFairsBestList, (data: any) =>
      (data as TFairGeo[]).map((fair) =>
        fair.id === fairID ? { ...fair, coverUrl: newPhoto.url } : fair
      )
    );
  };

  const handleRevalidateUpdate = async (newPhoto: TPhotograph) => {
    await handleRevalidateListsNew(newPhoto);

    await mutate(
      useSWRFairDetails,
      (data: any) =>
        ({
          ...data,
          coverUrl: newPhoto.url,
          photographs: data.photographs.map((photo: TFair) =>
            photo.id === newPhoto.id ? newPhoto : photo
          ),
        } as TFair)
    );
  };

  const handleRevalidateUpload = async (newPhoto: TPhotograph) => {
    await handleRevalidateListsNew(newPhoto);

    await mutate(
      useSWRFairDetails,
      (data: any) =>
        ({
          ...data,
          coverUrl: newPhoto.isCover ? newPhoto.url : data.coverUrl,
          photographs: [newPhoto].concat(
            data.photographs.map((photo: TFair) =>
              newPhoto.isCover ? { ...photo, isCover: false } : photo
            )
          ),
        } as TFair)
    );
  };

  const handleRevalidateDelete = async (
    photoID: string,
    photoCover: TPhotograph
  ) => {
    if (photoCover) await handleRevalidateListsNew(photoCover);

    await mutate(
      useSWRFairDetails,
      (data: any) =>
        ({
          ...data,
          coverUrl: photoCover ? photoCover.url : data.coverUrl,
          photographs: (data as TFair).photographs.filter(
            (photo) => photo.id !== photoID
          ),
        } as TFair)
    );
  };

  return {
    handleRevalidateUpload,
    handleRevalidateUpdate,
    handleRevalidateDelete,
  };
};
