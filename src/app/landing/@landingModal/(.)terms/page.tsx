// import { HydrationBoundary } from '@tanstack/react-query';
// import fetchTermsDetail from '@api/term/get/apis/fetchTermsDetail';
import { SearchParamsType } from '@common/types/routes.types';

// import queryKeys from '@common/constants/query-key.constants';

// import { getDehydratedState } from '@common/utils/dehydrate';
import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import TermsModal from '@common/components/modals/terms/TermsModal.client';
import { TermsType } from '@common/components/modals/terms/TermsModal.types';

const TermsModalPage = async ({ searchParams }: { searchParams?: Promise<SearchParamsType> }) => {
  // terms 모달 타입 가져오기
  const { type } = (await searchParams) ?? {};
  // Termstype에 속하지 않으면 404 띄우기
  const formattedType = parseEnumOr404(type, TermsType, TermsType.SERVICE);

  // const { dehydratedState } = await getDehydratedState({
  //   prefetch: async (qc) =>
  //     qc.prefetchQuery({
  //       queryKey: queryKeys.terms.detail(formattedType).queryKey,
  //       queryFn: () => fetchTermsDetail(formattedType),
  //     }),
  // });

  return (
    // <HydrationBoundary state={dehydratedState}>
    <ModalLayout>
      <TermsModal type={formattedType} />
    </ModalLayout>
    // </HydrationBoundary>
  );
};

export default TermsModalPage;
