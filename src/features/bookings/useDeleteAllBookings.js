import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteAllBookings as deleteAllBookingsApi } from '../../services/apiBookings';

export function useDeleteAllBookings() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingAll, mutate: deleteAllBookings } = useMutation({
    mutationFn: deleteAllBookingsApi,
    onSuccess: () => {
      toast.success('Bookings successfully deleted');
      queryClient.invalidateQueries({
        queryKey: 'bookings',
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeletingAll, deleteAllBookings };
}
