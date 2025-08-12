import clsx from 'clsx';

import TitleSection from '../../TitleSection/TitleSection.server';
import ColorTitle from '../ColorTitle/ColorTitle.server';
import { LandingIntroductionProps } from './LandingIntroduction.types';

/*
 * 랜딩 페이지 HaRu는 무슨 뜻인가요? 페이지
 */
const LandingIntroduction = ({ className }: LandingIntroductionProps) => {
  const meanContainClass = 'gap-y-14pxr flex flex-col';
  const titleContainClass = 'pb-20pxr border-stroke-200 flex w-full justify-between border-b';
  const blackTextClass = 'text-t5-sb text-black';
  const grayTextClass = 'text-gray-200 text-b2-rg';

  return (
    <div
      className={clsx(
        'pb-113pxr pt-103pxr gap-68pxr flex w-full flex-col items-center justify-center bg-gray-700',
        className,
      )}
    >
      <TitleSection title2="HaRu" title3="는 무슨 뜻인가요?" />
      <div className="flex">
        <div className={clsx('mr-52pxr w-322pxr', meanContainClass)}>
          {/* 타이틀 부분 */}
          <div className={titleContainClass}>
            <ColorTitle firstTitle="H" title="uman" description="인적" />
            <ColorTitle firstTitle="R" title="esource" description="자원" />
          </div>
          {/* 설명 부분 */}
          <div className="flex flex-col">
            <span className={grayTextClass}>HaRu는 가장 효율적인</span>
            <div>
              <span className={blackTextClass}>인적 자원(Human Resource) 관리</span>
              <span className={grayTextClass}>를 지향합니다.</span>
            </div>
          </div>
        </div>
        <div className={clsx('mr-43pxr w-455pxr', meanContainClass)}>
          {/* 타이틀 부분 */}
          <div className={titleContainClass}>
            <div className="flex flex-col">
              <div className="flex">
                <ColorTitle firstTitle="A" title="ssist /" className="pr-4pxr" />
                <ColorTitle firstTitle="A" title="utomate /" className="pr-4pxr" />
                <ColorTitle firstTitle="A" title="uthentic" />
              </div>
              <span className={'text-b4-md text-gray-300'}>도움, 자동화, 정확함</span>
            </div>
          </div>

          {/* 설명 부분 */}
          <div className="flex w-full flex-col">
            <div>
              <span className={grayTextClass}>HaRu는 사람을 </span>
              <span className={blackTextClass}>돕고(Assist), </span>
              <span className={grayTextClass}>업무를 </span>
              <span className={blackTextClass}>자동화하며(Automate),</span>
            </div>
            <div>
              <span className={blackTextClass}>정확하고 투명한(Authentic) 운영</span>
              <span className={grayTextClass}>을 보장합니다.</span>
            </div>
          </div>
        </div>
        <div className={clsx('w-340pxr', meanContainClass)}>
          {/* 타이틀 부분 */}
          <div className={titleContainClass}>
            <ColorTitle firstTitle="U" title="ser-Friendly" description="사용자 친화적" />
          </div>
          {/* 설명 부분 */}
          <div className="flex flex-col">
            <span className={grayTextClass}>HaRu는 모두가 부담 없이 사용할 수 있는</span>
            <div>
              <span className={blackTextClass}>사용자 친화적인(User-Friendly)</span>
              <span className={grayTextClass}> 서비스를 제공합니다.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingIntroduction;
