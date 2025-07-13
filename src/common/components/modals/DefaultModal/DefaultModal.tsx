import React, { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const DefaultModal = ({ children, onClose, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 외부 클릭 감지
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // 포커스 트랩, body 스크롤 차단 등은 추가 구현 필요

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
      tabIndex={-1}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={modalRef}
        style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 480 }}
      >
        {title && <h2 id="modal-title">{title}</h2>}
        {children}
        <button onClick={onClose} aria-label="Close modal">
          닫기
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default DefaultModal;
