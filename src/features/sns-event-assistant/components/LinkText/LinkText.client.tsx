import clsx from 'clsx';

import { LinkTextProps } from './LinkText.types';

/*
 * LinkText 컴포넌트는 주어진 텍스트를 링크로 표시합니다.
 * 링크는 새 탭에서 열리며, 언더바가 기본으로 표시됩니다.
 */
const LinkText = ({ text, className }: LinkTextProps) => {
  return (
    <a
      href={text}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx('hover:underline', className)}
    >
      {text}
    </a>
  );
};

export default LinkText;
