import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking as updateBookingApi } from '../../services/apiBookings';

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ guest, guestId, booking, bookingId }) =>
      updateBookingApi({ guest, guestId, booking, bookingId }),
    onSuccess: () => {
      toast.success('Booking successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { updateBooking, isUpdating };
}
