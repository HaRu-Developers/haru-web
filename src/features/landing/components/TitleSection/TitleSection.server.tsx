import clsx from 'clsx';

import { TitleSectionProps } from './TitleSection.type';

const TitleSection = ({
  title1,
  title2,
  title3,
  description,
  isSpacing = false,
  className,
}: TitleSectionProps) => {
  return (
    <div className={clsx('gap-10pxr flex flex-col', className)}>
      {/* 제목 */}
      <div
        className={clsx('text-h2-bd flex', {
          'flex-col': isSpacing,
          'flex-row': !isSpacing,
        })}
      >
        {title1 && <span className="mr-10pxr text-black">{title1}</span>}
        <div>
          <span className="text-primary">{title2}</span>
          <span>{title3}</span>
        </div>
      </div>
      {/* 내용 */}
      {description && <div className="text-t4-rg text-gray-200">{description}</div>}
    </div>
  );
};

export default TitleSection;
