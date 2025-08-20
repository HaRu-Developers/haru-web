import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';
import { SpeakerIconsState } from '@icons/SpeakerIcons/SpeakerIcons.types';

const SpeechItemSkeleton = () => {
  return (
    <div className="py-12pxr px-12pxr w-full">
      <div className="gap-x-12pxr flex">
        {/* 기본 회색 유저 아이콘 */}
        <SpeakerIcons state={SpeakerIconsState.USER_7} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="py-5pxr">
            <div className="animate-bg-pulse w-90pxr h-21pxr rounded" />
          </div>

          <div className="gap-5pxr flex flex-col">
            <div className="animate-bg-pulse w-600pxr h-18pxr rounded" />
            <div className="animate-bg-pulse w-500pxr h-18pxr rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechItemSkeleton;
