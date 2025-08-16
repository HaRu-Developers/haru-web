'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import notFoundImage from '@assets/images/404/image.png';

import useSnsEventList from '@api/sns-event-assistant/get/queries/useSnsEventList';

import {
  useSnsEventAssistantActions,
  useSnsEventAssistantInfo,
} from '@common/hooks/stores/useSnsEventAssistantStore';

import ListFileSnsEventAssistant from '@common/components/list-file/ListFileSnsEventAssistant/ListFileSnsEventAssistant.client';

const ListFileSnsEventAssistantWrapper = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { setCheckedList, setIsCheckedMode } = useSnsEventAssistantActions();
  const { checkedList, isCheckedMode } = useSnsEventAssistantInfo();
  const { extra: snsEvent } = useSnsEventList(workspaceId);
  const hasLists = !!snsEvent?.snsEventList;
  const handleCheckToggle = (id: string) => {
    if (checkedList.includes(id)) {
      const newCheckedList = checkedList.filter((checkedId) => checkedId !== id);
      setCheckedList(newCheckedList);

      if (newCheckedList.length === 0) {
        setIsCheckedMode(false);
      }
    } else {
      const newCheckedList = [...checkedList, id];
      setCheckedList(newCheckedList);
      if (newCheckedList.length === 1) {
        setIsCheckedMode(true);
      }
    }
  };

  const isChecked = (id: string) => {
    return checkedList.includes(id);
  };

  return (
    <>
      {hasLists ? (
        snsEvent?.snsEventList.map((list) => (
          <ListFileSnsEventAssistant
            key={list.snsEventId}
            {...list}
            isChecked={isChecked(list.snsEventId)}
            isCheckMode={isCheckedMode}
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
