import { collection, query, limit, orderBy, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";
import { TStand } from "@/types/TStands";

export const getBestStandsDB = (): Promise<TStand[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TStand[] = [];
      const q = query(
        collection(db, "stands"),
        limit(10),
        orderBy("stars", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as TStand);
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
