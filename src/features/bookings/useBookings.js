import { useQuery } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['all-bookings'],
    queryFn: getBookings,
  });

  return { isLoading, bookings };
}
