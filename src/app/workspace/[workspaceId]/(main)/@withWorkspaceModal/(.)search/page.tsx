'use client';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import SearchModal from '@common/components/modals/SearchModal/SearchModal.client';

/**
 * @description 경로를 가로채서 보여주는 모달의 실제 컨텐츠
 */

const SearchModalPage = () => {
  return (
    <ModalLayout>
      <SearchModal />
    </ModalLayout>
  );
};

export default SearchModalPage;
