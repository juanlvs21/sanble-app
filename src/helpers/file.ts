export const FILE_TYPE: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
};

export const base64StringToBlob = (base64String: string) => {
  const rawData = atob(base64String);
  const bytes = new Array(rawData.length);

  for (var x = 0; x < rawData.length; x++) {
    bytes[x] = rawData.charCodeAt(x);
  }

  const arr = new Uint8Array(bytes);

  return new Blob([arr], { type: "image/png" });
};
