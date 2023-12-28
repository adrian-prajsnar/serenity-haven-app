import { formatDistance, parseISO, set } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

export function formatDateStringToSupabase(dateString) {
  const dateObject = new Date(dateString);
  const formattedDate = set(dateObject, {
    hours: 1,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  return formattedDate.toISOString().slice(0, -1);
}

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const formatCurrency = value =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
