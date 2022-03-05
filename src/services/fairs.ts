import {
  collection,
  query,
  where,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { db } from "@/utils/firebase";
import { TFair } from "@/types/TFairs";

export const getUpcomingFairsDB = (): Promise<TFair[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TFair[] = [];
      const maxDate = new Date().getTime() + 2419200000; // Current date + 4 weeks

      const q = query(
        collection(db, "fairs"),
        where("date_time", "<", maxDate),
        limit(10),
        orderBy("date_time", "asc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as TFair);
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
