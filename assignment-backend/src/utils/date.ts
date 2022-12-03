import { add, differenceInCalendarDays, Duration, format } from "date-fns";

export const formatDate = (date: string | Date = new Date(), dateFormat = "yyyy-MM-dd") => {
  if (typeof date === "string") date = new Date(date);
  return format(date, dateFormat);
};

export const dateDifferenceInDays = (dateA: Date | number, dateB: Date | number) => {
  return differenceInCalendarDays(dateA, dateB);
};

export const addDate = (date: Date, duration: Duration) => {
  return add(date, duration);
};

export const prepareDateFilter = (query: { dateFrom: string; dateTo?: string }) => {
  let dateTo = query.dateTo ? new Date(query.dateTo) : new Date();
  let dateFrom = query.dateFrom ? new Date(query.dateFrom) : addDate(new Date(), { days: -30 });

  const dateDifference = Math.abs(dateDifferenceInDays(dateFrom, dateTo));
  if (dateDifference > 28) dateFrom.setDate(dateTo.getDate() - 30);

  return { dateFrom, dateTo };
};
