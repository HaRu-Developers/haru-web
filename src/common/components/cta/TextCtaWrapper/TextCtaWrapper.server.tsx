'use client';

import Link from 'next/link';

import TextCta from '@common/components/cta/TextCta/TextCta.client';

import { modalHrefByFileType } from './TextCtaWrapper.constants';
import { TextCtaWrapperProps } from './TextCtaWrapper.types';

const TextCtaWrapper = ({ fileType, workspaceId }: TextCtaWrapperProps) => {
  // TODO : optional 떄문에 발생하는 문제 해결 필요
  const href = modalHrefByFileType(workspaceId ?? '')[fileType];

  if (!href) {
    console.warn(
      `ERROR: TextCta를 위한 href 생성에 실패했습니다. FILE_TYPE: ${fileType} & WORKSPACE_ID: ${workspaceId}`,
    );
  }

  return href ? (
    <Link href={href} className="inline-block w-fit">
      <TextCta type={fileType} disabled={false} />
    </Link>
  ) : (
    <TextCta type={fileType} onClick={() => console.warn('미지원')} disabled={!href} />
  );
};

export default TextCtaWrapper;
