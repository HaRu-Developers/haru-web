'use client';

import Link from 'next/link';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { modalHrefByFileType } from './TextCtaWrapper.constants';
import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType, workspaceId }: TextCtaWrapperProps) => {
  // TODO : optional 떄문에 발생하는 문제 해결 필요
  const href = modalHrefByFileType(workspaceId ?? '')[fileType];

  return href ? (
    <Link href={href}>
      <TextCta type={fileType} />
    </Link>
  ) : (
    <TextCta type={fileType} onClick={() => console.warn('미지원')} disabled={!href} />
  );
};

export default TextCtaWrapper;
