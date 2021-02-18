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

  const setDataError = (errs: any) => {
    setErrors(errs ? errs : "");
    setShowErrors(errs ? true : false);
  };

  const handleGetList = async () => {
    setLoading(true);
    setDataError(null);

    try {
      const standsRef = db.collection("stands");
      const snapshot = await standsRef.get();

      if (snapshot.empty) setStandsList([]);
      else {
        const data: Array<any> = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setStandsList(data);
      }
      setLoading(false);
    } catch (error) {
      setDataError("Ha ocurrido un error al cargar los stands.");
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    showErrors,
    standsList,
    setShowErrors,
    handleGetList,
  };
};

export default useStands;
