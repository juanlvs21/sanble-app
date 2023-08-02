export async function fetchBlob(url: string) {
  const response = await fetch(url);

  return response.blob();
}
