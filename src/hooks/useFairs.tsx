import { useState } from "react";

// Utils
import { db } from "../utils/firebase";
// import { standRegister } from "../utils/services/API";

// Interfaces
import IFairs from "../interfaces/IFairs";
import { TQueryWhere } from "../interfaces/IFirebase";

const useFairs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [fairsList, setFairsList] = useState<Array<IFairs>>([]);
  const [lastKey, setLastKey] = useState<string>("");
  const [fairDetails, setFairDetails] = useState<IFairs | null>(null);

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleClearDetails = () => {
    setLoading(true);
    setFairDetails(null);
  };

  const handleGetList = async (queryWhere: TQueryWhere = null) => {
    setLoading(true);
    setDataError(null);

    try {
      const snapshot = queryWhere
        ? await db
            .collection("fairs")
            .orderBy("name", "asc")
            .limit(5)
            .where(queryWhere.field, queryWhere.op, queryWhere.value)
            .get()
        : await db.collection("fairs").orderBy("name", "asc").limit(5).get();

      if (snapshot.empty) setFairsList([]);
      else {
        const data: Array<any> = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setLastKey(data[data.length - 1].name);
        setFairsList(data);
      }
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido un error al cargar las ferias.");
    }
    setLoading(false);
  };

  const handleGetNextList = async (queryWhere: TQueryWhere = null) => {
    setDataError(null);

    try {
      const snapshot = queryWhere
        ? await db
            .collection("fairs")
            .orderBy("name", "asc")
            .startAfter(lastKey)
            .limit(5)
            .where(queryWhere.field, queryWhere.op, queryWhere.value)
            .get()
        : await db
            .collection("fairs")
            .orderBy("name", "asc")
            .startAfter(lastKey)
            .limit(5)
            .get();

      if (!snapshot.empty) {
        const data: Array<any> = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setLastKey(data[data.length - 1].name);
        setFairsList((list) => [...list, ...data]);
      }
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido un error al cargar más ferias.");
    }
  };

  // const handleGetDetails = async (uuid: string) => {
  //   setFairDetails(null);
  //   setLoading(true);
  //   setDataError(null);

  //   try {
  //     const doc: any = await db.collection("fairs").doc(uuid).get();
  //     if (!doc.exists) setDataError("Feria no existe.");
  //     else setFairDetails(doc.data());
  //   } catch (error) {
  //     console.error(error);
  //     setDataError("Ha ocurrido detalles de feria.");
  //   }
  //   setLoading(false);
  // };

  // const handleRegister = async (data: object) => {
  //   setLoading(true);
  //   setDataError(null);

  //   return new Promise(async (resolve, rejects) => {
  //     await standRegister(data)
  //       .then((res: any) => {
  //         resolve(res);
  //       })
  //       .catch((errors: any) => {
  //         setDataError(errors);
  //         rejects(errors);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // };

  return {
    loading,
    errors,
    showErrors,
    fairsList,
    fairDetails,
    setShowErrors,
    handleClearDetails,
    handleGetList,
    handleGetNextList,
    // handleGetDetails,
    // handleRegister,
  };
};

export default useFairs;
