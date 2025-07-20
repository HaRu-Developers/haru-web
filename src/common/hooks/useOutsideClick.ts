import { useEffect } from 'react';

/**
 * 컴포넌트 바깥 클릭시 지정 함수 실행 훅
 */
const useOutsideClick = (ref: React.RefObject<HTMLElement | null>, onOutsideClick: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
