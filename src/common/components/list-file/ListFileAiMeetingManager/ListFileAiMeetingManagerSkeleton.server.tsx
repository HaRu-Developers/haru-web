import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

const ListFileAiMeetingManagerSkeleton = () => {
  return (
    <div className="">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="pt-19pxr pb-18pxr gap-x-10pxr flex w-full items-center" key={index}>
          <div className="w-36pxr h-36pxr animate-bg-pulse rounded-6pxr flex items-center justify-center">
            <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE} />
          </div>
          <div className="gap-y-8pxr flex flex-col">
            <div className="w-252pxr h-16pxr animate-bg-pulse rounded-4pxr" />
            <div className="w-164pxr h-12pxr animate-bg-pulse rounded-4pxr" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFileAiMeetingManagerSkeleton;
