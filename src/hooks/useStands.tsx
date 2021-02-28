import { useState } from "react";

// Utils
import { db } from "../utils/firebase";

// Interfaces
import IStands from "../interfaces/IStands";

const useStands = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [standsList, setStandsList] = useState<Array<IStands>>([]);
  const [lastKey, setLastKey] = useState<string>("");
  const [standDetails, setStandDetails] = useState<IStands>();

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleGetList = async () => {
    setLoading(true);
    setDataError(null);

    try {
      const snapshot = await db
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
      setLoading(false);
    } catch (error) {
      console.error(error);
      setDataError("Ha ocurrido un error al cargar los stands.");
      setLoading(false);
    }
  };

  const handleGetNextList = async () => {
    setDataError(null);

    try {
      const snapshot = await db
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
  };

  return {
    loading,
    errors,
    showErrors,
    standsList,
    standDetails,
    setShowErrors,
    handleGetList,
    handleGetNextList,
    handleGetDetails,
  };
};

export default useStands;
