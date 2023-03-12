import { useSWRConfig } from "swr";

export const useStandsRevalidate = (standID: string) => {
  const useSWRStandsList = "/stands";
  const useSWRStandsBestList = "/stands/best";
  const useSWRStandDetails = `/stands/${standID}`;

  const { cache } = useSWRConfig();

  const handleRevalidateDetails = () => {
    cache.delete(useSWRStandDetails);
  };

  const handleRevalidateLists = () => {
    cache.delete(useSWRStandsList);
    cache.delete(useSWRStandsBestList);
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
