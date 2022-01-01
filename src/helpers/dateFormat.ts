import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export const dateFormat = (
  date: string | number = new Date().getTime(),
  format = 'YYYY/MM/DD',
): string => dayjs(date).format(format);
