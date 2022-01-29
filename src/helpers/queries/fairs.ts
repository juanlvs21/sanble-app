import firestore from '@react-native-firebase/firestore';

import {TFair} from '@/types/fair';
import {fairTypeFriendly} from '@/helpers/fairType';

export const getUpcomingFairsDB = (): Promise<TFair[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TFair[] = [];
      const maxDate = new Date().getTime() + 2419200000; // Current date + 4 weeks

      const querySnapshot = await firestore()
        .collection('fairs')
        .where('date_time', '<', maxDate)
        .limit(10)
        .orderBy('date_time', 'asc')
        .get();

      querySnapshot.forEach(doc => {
        data.push(doc.data() as TFair);
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const getListFairsDB = (): Promise<TFair[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const data: TFair[] = [];

      const querySnapshot = await firestore()
        .collection('fairs')
        .orderBy('stars', 'desc')
        .get();

      querySnapshot.forEach(doc => {
        data.push({
          ...doc.data(),
          typeFriendly: fairTypeFriendly(doc.data().type),
        } as TFair);
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
