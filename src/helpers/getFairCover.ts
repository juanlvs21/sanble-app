import {noImage} from './imagesDefault';
import {TFairPhotograph} from '../types/fair';

export const getFairCover = (photograph: TFairPhotograph[] = []) => {
  let cover = noImage;

  photograph.map(photo => {
    if (photo.cover) {
      cover = {uri: photo.url_photo};
    }
  });

  return cover;
};
