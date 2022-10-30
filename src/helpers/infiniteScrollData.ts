export const infiteScrollData = <T = any>(
  key: string,
  newData: T[],
  currentData?: T[]
): T[] => {
  let data: T[] = currentData ? [...currentData, ...newData] : newData;

  let hash: Record<string, boolean> = {};
  data = data.filter(function (current: any) {
    var exists = !hash[current[key]];
    hash[current[key]] = true;
    return exists;
  });

  return data;
};
