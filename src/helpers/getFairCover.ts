import {noImage} from './imagesDefault';
import {TFairPhotograph} from '../types/fairs';

export const getFairCover = (photograph: TFairPhotograph[] = []) => {
  let cover = noImage;

  photograph.map(photo => {
    if (photo.cover) {
      cover = {uri: photo.url_photo};
    }
  });

  console.log({cover});

  return cover;
};
