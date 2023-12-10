import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { loadDefaultSettings as loadDefaultSettingsApi } from '../../services/apiSettings';

export function useLoadDefaultSettings() {
  const queryClient = useQueryClient();

  const { mutate: loadDefaultSettings, isLoading: isLoadingDefaultSettings } =
    useMutation({
      mutationFn: loadDefaultSettingsApi,
      onSuccess: () => {
        toast.success('Default settings successfully loaded');
        queryClient.invalidateQueries({
          queryKey: ['settings'],
        });
      },
      onError: err => toast.error(err.message),
    });

  return {
    loadDefaultSettings,
    isLoadingDefaultSettings,
  };
}
