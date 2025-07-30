'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';

import { ChangableWorkspaceImageProps } from './ChangableWorkspaceImage.types';

const ChangableWorkspaceImage = ({
  initialPreview = null,
  title,
  onFileChange,
  className,
}: ChangableWorkspaceImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);

  // initialPreview가 바뀌었을 때 반영
  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      onFileChange?.(file); // 부모에서 추가 처리
    }
  };

  return (
    <div
      className={clsx(
        'group w-76pxr h-76pxr p-8pxr rounded-9pxr border-stroke-100 flex shrink-0 cursor-pointer items-center justify-center border border-solid',
        className,
      )}
      onClick={handleClick}
    >
      <div className="w-66pxr rounded-8pxr h-66pxr p-3pxr flex shrink-0 items-center justify-center gap-2.5 group-hover:bg-gray-600">
        <WorkspaceProfileImage src={preview} title={title} className="text-t3-sb h-56pxr w-56pxr" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ChangableWorkspaceImage;
