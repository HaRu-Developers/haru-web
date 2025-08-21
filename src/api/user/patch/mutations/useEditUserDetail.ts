import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { User } from '../../api.types';
import { fetchUserEdit } from '../apis/fetchUserEdit';

const useEditUserDetail = () => {
  const router = useRouter();

  return useMutation<
    { result: User }, // TData
    ApiError<ApiErrorBody>, // TError
    { name: string; password: string } // TMutateVariables
  >({
    mutationFn: ({ name, password }) => fetchUserEdit({ name, password }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
  });
};

export default useEditUserDetail;
