import { useSWRConfig } from "swr";

export const useFairsRevalidate = (fairID: string) => {
  const useSWRFairsList = "/fairs";
  const useSWRFairsBestList = "/fairs/best";
  const useSWRFairDetails = `/fairs/${fairID}`;

  const { cache } = useSWRConfig();

  const handleRevalidateDetails = () => {
    cache.delete(useSWRFairDetails);
  };

  const handleRevalidateLists = () => {
    cache.delete(useSWRFairsList);
    cache.delete(useSWRFairsBestList);
  };

  const handleRevalidateAll = () => {
    handleRevalidateDetails();
    handleRevalidateLists();
  };

  return {
    handleRevalidateDetails,
    handleRevalidateLists,
    handleRevalidateAll,
  };
};
