import dayjs from 'dayjs';
export function formatDate(date, pattern = 'DD-MM-YYYY HH:mm:ss') {
  if (dayjs(date).isValid()) {
    return dayjs(date).format(pattern);
  }

  return date;
}
