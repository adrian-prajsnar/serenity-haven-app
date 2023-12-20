import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteAllCabins as deleteAllCabinsApi } from '../../services/apiCabins';

export function useDeleteAllCabins() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingAll, mutate: deleteAllCabins } = useMutation({
    mutationFn: deleteAllCabinsApi,
    onSuccess: () => {
      toast.success('Cabins successfully deleted');
      queryClient.invalidateQueries({
        queryKey: 'cabins',
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeletingAll, deleteAllCabins };
}
