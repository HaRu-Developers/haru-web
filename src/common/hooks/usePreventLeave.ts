import { useEffect } from 'react';

/**
 * 사용자가 변경사항이 있는 페이지를 벗어나려 할 때 경고창을 띄우는 커스텀 훅입니다.
 *
 * @param {boolean} isDirty - 페이지에 저장되지 않은 변경사항이 있는지 여부. true일 때만 경고가 활성화됩니다.
 *
 * @example State와 Hook을 함께 사용하여 처리하는 것을 추천합니다.
 * ```ts
 * const [isDirty, setIsDirty] = useState<boolean>(false);
 * usePreventLeave(isDirty);
 * ```
 */
const usePreventLeave = (isDirty: boolean) => {
  useEffect(() => {
    // isDirty가 false이면 아무것도 하지 않습니다.
    if (!isDirty) return;

    // 페이지를 떠나기 전에 실행될 이벤트 핸들러
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 표준에 따라 브라우저의 기본 동작을 막습니다.
      event.preventDefault();

      // 일부 레거시 브라우저와의 호환성을 위해 returnValue를 설정합니다.
      // 호환성을 위한 코드라, 우선은 경고 제거를 위해서 주석 처리해둡니다.

      // 이 값을 커스텀 메시지로 사용할 수는 없습니다.
      // event.returnValue = '';
    };

    // 'beforeunload' 이벤트 리스너를 window에 추가합니다.
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트가 언마운트되거나 isDirty 상태가 바뀔 때 이벤트 리스너를 정리(cleanup)합니다.
    // 이렇게 하지 않으면 메모리 누수가 발생할 수 있습니다.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]); // isDirty 상태가 변경될 때마다 이 effect를 다시 실행합니다.
};

export default usePreventLeave;
