import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBookingStatus } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBookingStatus(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () =>
      toast.error('There was an error while checking out the booking'),
  });

  return { checkout, isCheckingOut };
}
