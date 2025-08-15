'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import notFoundImage from '@assets/images/404/image.png';

import useSnsEventList from '@api/sns-event-assistant/get/queries/useSnsEventList';

import ListFileSnsEventAssistant from '@common/components/list-file/ListFileSnsEventAssistant/ListFileSnsEventAssistant.client';

import { ListFileSnsEventAssistantWrapperProps } from './ListFileSnsEventAssistantWrapper.types';

const ListFileSnsEventAssistantWrapper = ({
  checkedList,
  onCheckModeToggle,
  onCheckedListToggle,
}: ListFileSnsEventAssistantWrapperProps) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { extra } = useSnsEventList(workspaceId);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const hasLists = !!extra?.snsEventList;
  const handleCheckToggle = (id: string) => {
    if (checkedList.includes(id)) {
      const newCheckedList = checkedList.filter((checkedId) => checkedId !== id);
      onCheckedListToggle?.(newCheckedList);

      if (newCheckedList.length === 0) {
        setIsCheckMode(false);
      }
    } else {
      const newCheckedList = [...checkedList, id];
      onCheckedListToggle?.(newCheckedList);
      if (newCheckedList.length === 1) {
        setIsCheckMode(true);
      }
    }
  };

  const isChecked = (id: string) => {
    return checkedList.includes(id);
  };

  useEffect(() => {
    onCheckModeToggle?.(isCheckMode);
  }, [isCheckMode, onCheckModeToggle]);

  useEffect(() => {
    onCheckedListToggle?.(checkedList);
  }, [checkedList, onCheckedListToggle]);

  return (
    <>
      {hasLists ? (
        extra?.snsEventList.map((list) => (
          <ListFileSnsEventAssistant
            key={list.snsEventId}
            {...list}
            isChecked={isChecked(list.snsEventId)}
            isCheckMode={isCheckMode}
            onCheckToggle={handleCheckToggle}
          />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileSnsEventAssistantWrapper;
