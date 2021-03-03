export const getData: any = (): Promise<Response> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://s3.amazonaws.com/dolartoday/data.json"
      );
      const { USD } = await response.json();

      if (!response.ok) {
        reject("Error al conectar con DolarToday");
      } else resolve(USD);
    } catch (error) {
      console.log(error);
      reject("Error desconocido");
    }
  });
};
