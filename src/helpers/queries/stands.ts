import firestore from '@react-native-firebase/firestore';

import {TStand} from '@/types/stand';

export const getBestStandsDB = (): Promise<TStand[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TStand[] = [];

      const querySnapshot = await firestore()
        .collection('stands')
        .limit(10)
        .orderBy('stars', 'desc')
        .get();

      querySnapshot.forEach(doc => {
        data.push(doc.data() as TStand);
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const getListStandsDB = (): Promise<TStand[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TStand[] = [];

      const querySnapshot = await firestore()
        .collection('stands')
        .orderBy('stars', 'desc')
        .get();

      querySnapshot.forEach(doc => {
        data.push({
          ...doc.data(),
        } as TStand);
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
