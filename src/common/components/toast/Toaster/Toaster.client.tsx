'use client';

import { MAX_TOAST_COUNT } from '@common/constants/toast';

import { useToastInfo } from '@common/hooks/stores/useToastStore';

import Toast from '../Toast/Toast.client';

const Toaster = () => {
  const { toastList } = useToastInfo();

  return (
    <div className="bottom-20pxr right-20pxr w-300pxr gap-20pxr fixed z-1 flex flex-col items-end">
      {toastList.map((toast) => (
        <Toast key={toast.key} toast={toast} />
      ))}
    </div>
  );
};

export default Toaster;
