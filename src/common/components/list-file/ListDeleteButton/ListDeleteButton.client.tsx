import ListTrashIcons from '@icons/ListTrash/ListTrashIcons';
import { ListTrashIconsState } from '@icons/ListTrash/ListTrashIcons.types';

import { ButtonsCommonProps } from '@common/components/buttons/types/buttons.common.types';

const ListDeleteButton = ({ onClick }: ButtonsCommonProps) => {
  return (
    <button
      className="py-5pxr pr-10pxr pl-8pxr text-bt3-sb gap-x-2pxr text-system-red rounded-7pxr flex items-center justify-center hover:bg-gray-600"
      onClick={onClick}
    >
      <ListTrashIcons state={ListTrashIconsState.TRASH} />
      {'지우기'}
    </button>
  );
};

export default ListDeleteButton;
