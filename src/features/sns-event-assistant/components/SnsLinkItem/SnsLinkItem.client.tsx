import CopyButton from '../CopyButton/CopyButton.client';
import { SnsLinkItemProps } from './SnsLinkItem.type';

const SnsLinkItem = ({ title, link, onClick }: SnsLinkItemProps) => {
  return (
    <div className="px-32pxr pb-24pxr pt-16pxr w-668pxr rounded-12pxr gap-y-3pxr flex flex-col justify-center bg-gray-700">
      <span className="text-t5-bd">{title}</span>
      <div className="flex items-center justify-between">
        <span className="text-t7-rg cursor-pointer hover:underline">{link}</span>
        <CopyButton link={link} onClick={onClick} isHoverable={false} />
      </div>
    </div>
  );
};

export default SnsLinkItem;
