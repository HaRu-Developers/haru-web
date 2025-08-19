import { notFound, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { UpdateWorkspaceResponseDto } from '@api/workspace/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { fetchWorkspaceEdit } from '../apis/fetchWorkspaceEdit';

const useEditWorkspaceDetail = () => {
  const router = useRouter();

  return useMutation<
    { result: UpdateWorkspaceResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    { title: string; image?: File; workspaceId: string } // TMutateVariables
  >({
    mutationFn: ({ title, image, workspaceId }) =>
      fetchWorkspaceEdit({ title, image, workspaceId }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
  });
};

export default useEditWorkspaceDetail;
