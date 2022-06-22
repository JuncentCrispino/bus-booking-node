import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);

const today = (data) => {
  const date = dayjs(data);
  return date.tz('Asia/Manila');
};

export default today;