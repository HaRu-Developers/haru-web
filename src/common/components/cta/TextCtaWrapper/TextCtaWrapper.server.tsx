'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { modalHrefByFileType } from './TextCtaWrapper.constants';
import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType }: TextCtaWrapperProps) => {
  const pathname = usePathname();
  const subPath = modalHrefByFileType[fileType];

  const href = subPath ? `${pathname}/${subPath}` : '#';

  return href === '#' ? (
    <TextCta type={fileType} onClick={() => console.warn('미지원')} disabled={!href} />
  ) : (
    <Link href={href}>
      <TextCta type={fileType} />
    </Link>
  );
};

export default TextCtaWrapper;
