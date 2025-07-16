'use client';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import { SnsLinkProps } from './SnsLink.types';

const SnsLink = ({ title, url }: SnsLinkProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex w-167 flex-col rounded-xl bg-gray-700 px-8 pt-4 pb-6">
      <h2 className="text-t5-bd mb-2 text-black">{title}</h2>
      <div className="flex items-center justify-between gap-2">
        <span className="text-b3-rg text-black">{url}</span>
        <button onClick={handleCopy} title="링크 복사" className="mt-4">
          <FeatureTabIcons state={FeatureTabIconsState.COPY} />
        </button>
      </div>
    </div>
  );
};

export default SnsLink;
