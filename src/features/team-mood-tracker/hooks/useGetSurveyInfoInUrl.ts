'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

interface CreateSurveyPageParams {
  title: string;
  dueDate: string;
  description: string;
  visibility: string;
}

export const useGetSurveyInfoInUrl = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const searchParams = useSearchParams();
  const pageQuery: CreateSurveyPageParams = {
    title: searchParams.get('title') ?? '',
    dueDate: searchParams.get('dueDate') ?? '',
    description: searchParams.get('description') ?? '',
    visibility: searchParams.get('visibility') ?? 'PUBLIC',
  };

  return {
    workspaceId,
    pageQuery,
  };
};
