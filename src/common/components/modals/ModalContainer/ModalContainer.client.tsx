'use client';

import React from 'react';

import { createPortal } from 'react-dom';

import useModalStore from '@common/stores/modal-store';

const ModalContainer = () => {
  const { modals, closeModal } = useModalStore();

  if (typeof window === 'undefined') {
    return null; // SSR 환경에서는 렌더링하지 않음
  }

  return createPortal(
    <>
      {modals.map((modal, index) => {
        const ModalComponent = modal.component;
        const zIndex = modal.options?.zIndex || 1000 + index * 10; // 중첩될수록 z-index 증가

        return (
          <div
            key={modal.id}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: zIndex,
            }}
            onClick={
              modal.options?.overlayClickToClose !== false ? () => closeModal(modal.id) : undefined
            }
          >
            <div
              style={{
                background: 'white',
                borderRadius: '14px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                minWidth: '300px',
                maxWidth: '90%',
                maxHeight: '90%',
                overflowY: 'auto',
                position: 'relative',
                zIndex: zIndex + 1, // 모달 컨텐츠가 배경보다 위에
              }}
              onClick={(e) => e.stopPropagation()} // 모달 컨텐츠 클릭 시 배경 닫힘 방지
            >
              <ModalComponent
                {...modal.props}
                onClose={() => closeModal(modal.id)} // 모달 내부에서 닫을 수 있도록 onClose 전달
                modalId={modal.id} // 필요하다면 모달 ID도 전달
              />
            </div>
          </div>
        );
      })}
    </>,
    document.body, // body에 포털 생성
  );
};

export default ModalContainer;
