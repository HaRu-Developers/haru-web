import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import ListTrash from '@svgs/list-trash/TrashOutline.svg';

import { ListTrashIconsState } from './ListTrashIcons.types';

const ListTrashIcons = ({ state, className }: IconsCommonProps<ListTrashIconsState>) => {
  switch (state) {
    case ListTrashIconsState.TRASH:
      return <ListTrash className={clsx('h-18pxr w-18pxr text-gray-400', className)} />;
    default:
      return null;
  }
};

export default ListTrashIcons;
