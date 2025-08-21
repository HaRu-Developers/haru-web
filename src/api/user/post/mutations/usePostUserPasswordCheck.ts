import { notFound } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { PasswordCheckResponseDto } from '../../api.types';
import { postUserPasswordCheck } from '../apis/post-user-password-check';

const usePostUserPasswordCheck = () => {
  return useMutation<
    { result: PasswordCheckResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    { requestPassword: string } // TMutateVariables
  >({
    mutationFn: ({ requestPassword }) => postUserPasswordCheck({ requestPassword }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
        notFound();
      }
    },
  });
};

export default usePostUserPasswordCheck;
