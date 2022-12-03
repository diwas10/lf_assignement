import { format } from 'date-fns';

export const formatDate = (date: string | Date = new Date(), dateFormat = 'yyyy-MM-dd') => {
  if (typeof date === 'string') date = new Date(date);
  return format(date, dateFormat);
};
