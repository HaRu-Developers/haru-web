import TitleSection from '../TitleSection/TitleSection.server';
import ColorTitle from './ColorTitle/ColorTitle.server';

const LandingIntroduction = () => {
  return (
    <div className="w-1440pxr pb-113pxr flex flex-col items-center justify-center bg-gray-700">
      <TitleSection title2="Haru" title3="는 무슨 뜻인가요?" className="mt-103pxr mb-68pxr" />
      <div className="flex">
        <div className="mr-52pxr">
          {/* 타이틀 부분 */}
          <div className="w-322pxr pb-20pxr mb-14pxr border-stroke-200 flex justify-between border-b">
            <ColorTitle firstTitle="H" title="uman" description="인적" />
            <ColorTitle firstTitle="R" title="esource" description="자원" />
          </div>
          {/* 설명 부분 */}
          <div className="text-b2-rg flex flex-col">
            <span className="text-gray-200">HaRu는 가장 효율적인</span>
            <div>
              <span className="text-t5-sb text-black">인적 자원(Human Resource) 관리</span>
              <span className="text-gray-200">를 지향합니다.</span>
            </div>
          </div>
        </div>
        <div className="mr-43pxr">
          {/* 타이틀 부분 */}
          <div className="w-455pxr pb-20pxr mb-14pxr border-stroke-200 flex flex-col border-b">
            <div className="flex">
              <ColorTitle firstTitle="A" title="ssist /" className="pr-4pxr" />
              <ColorTitle firstTitle="A" title="utomate /" className="pr-4pxr" />
              <ColorTitle firstTitle="A" title="uthentic" />
            </div>
            <span className="text-b4-md text-gray-300">도움, 자동화, 정확함</span>
          </div>

          {/* 설명 부분 */}
          <div className="text-b2-rg flex flex-col">
            <div>
              <span className="text-gray-200">HaRu는 사람을 </span>
              <span className="text-t5-sb text-black">돕고(Assist), </span>
              <span className="text-gray-200">업무를 </span>
              <span className="text-t5-sb text-black">자동화하며(Automate),</span>
            </div>
            <div>
              <span className="text-t5-sb text-black">정확하고 투명한(Authentic) 운영</span>
              <span className="text-gray-200">을 보장합니다.</span>
            </div>
          </div>
        </div>
        <div>
          {/* 타이틀 부분 */}
          <div className="w-322pxr pb-20pxr mb-14pxr border-stroke-200 flex border-b">
            <ColorTitle firstTitle="U" title="ser-Friendly" description="사용자 친화적" />
          </div>
          {/* 설명 부분 */}
          <div className="text-b2-rg flex flex-col">
            <span className="text-gray-200">HaRu는 모두가 부담 없이 사용할 수 있는</span>
            <div>
              <span className="text-t5-sb text-black">사용자 친화적인(User-Friendly)</span>
              <span className="text-gray-200"> 서비스를 제공합니다.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingIntroduction;
