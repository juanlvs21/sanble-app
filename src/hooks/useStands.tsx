import { useState } from "react";

// Utils
import { db } from "../utils/firebase";
import { standRegister } from "../utils/services/API";

// Interfaces
import IStands from "../interfaces/IStands";
import { TQueryWhere } from "../interfaces/IFirebase";

const useStands = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [standsList, setStandsList] = useState<Array<IStands>>([]);
  const [lastKey, setLastKey] = useState<string>("");
  const [standDetails, setStandDetails] = useState<IStands | null>(null);

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleClearDetails = () => {
    setLoading(true);
    setStandDetails(null);
  };

  const handleGetList = async (queryWhere: TQueryWhere = null) => {
    setLoading(true);
    setDataError(null);

    try {
      const snapshot = queryWhere
        ? await db
            .collection("stands")
            .orderBy("creationTime", "desc")
            .limit(5)
            .where(queryWhere.field, queryWhere.op, queryWhere.value)
            .get()
        : await db
            .collection("stands")
            .orderBy("creationTime", "desc")
            .limit(5)
            .get();

      if (snapshot.empty) setStandsList([]);
      else {
        const data: Array<any> = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setLastKey(data[data.length - 1].creationTime);
        setStandsList(data);
      }
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido un error al cargar los stands.");
    }
    setLoading(false);
  };

  const handleGetNextList = async (queryWhere: TQueryWhere = null) => {
    setDataError(null);

    try {
      const snapshot = queryWhere
        ? await db
            .collection("stands")
            .orderBy("creationTime", "desc")
            .startAfter(lastKey)
            .limit(5)
            .where(queryWhere.field, queryWhere.op, queryWhere.value)
            .get()
        : await db
            .collection("stands")
            .orderBy("creationTime", "desc")
            .startAfter(lastKey)
            .limit(5)
            .get();

      if (!snapshot.empty) {
        const data: Array<any> = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setLastKey(data[data.length - 1].creationTime);
        setStandsList((list) => [...list, ...data]);
      }
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido un error al cargar más stands.");
    }
  };

  const handleGetDetails = async (uuid: string) => {
    setStandDetails(null);
    setLoading(true);
    setDataError(null);

    try {
      const doc: any = await db.collection("stands").doc(uuid).get();
      if (!doc.exists) setDataError("Stand no existe.");
      else setStandDetails(doc.data());
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido detalles de stand.");
    }
    setLoading(false);
  };

  const handleRegister = async (data: object) => {
    setLoading(true);
    setDataError(null);

    return new Promise(async (resolve, rejects) => {
      await standRegister(data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((errors: any) => {
          setDataError(errors);
          rejects(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return {
    loading,
    errors,
    showErrors,
    standsList,
    standDetails,
    setShowErrors,
    handleClearDetails,
    handleGetList,
    handleGetNextList,
    handleGetDetails,
    handleRegister,
  };
};

export default useStands;
