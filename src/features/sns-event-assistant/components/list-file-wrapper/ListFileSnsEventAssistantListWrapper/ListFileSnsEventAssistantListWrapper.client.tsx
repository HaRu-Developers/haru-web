'use client';

import { useState } from 'react';

import useDeleteSnsEventMutation from '@api/sns-event-assistant/delete/mutations/useDeleteSnsEventMutation';

import { FileType } from '@common/types/file-type.enum';

import ListDeleteButton from '@common/components/list-file/ListDeleteButton/ListDeleteButton.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileSnsEventAssistantWrapper from '../ListFileSnsEventAssistantWrapper/ListFileSnsEventAssistantWrapper.client';

const ListFileSnsEventAssistantListWrapper = () => {
  const [isCheckedMode, setIsCheckMode] = useState<boolean>(true);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { mutate } = useDeleteSnsEventMutation();
  // 화면 갱신 해야 함 - create가 안되서 일단 보류...
  // store tankquery 사용 예정
  const handleDelete = () => {
    if (checkedList.length === 0) return;

    const successfullyDeletedIds: string[] = [];
    let pendingDeletions = checkedList.length;

    checkedList.forEach((snsEventId) => {
      mutate(
        { snsEventId },
        {
          onSuccess: () => {
            successfullyDeletedIds.push(snsEventId);
            pendingDeletions--;

            if (pendingDeletions === 0) {
              const newCheckedList = checkedList.filter(
                (id) => !successfullyDeletedIds.includes(id),
              );

              setCheckedList(newCheckedList);

              if (newCheckedList.length === 0) {
                setIsCheckMode(false);
              }
            }
          },
          onError: (error) => {
            console.error(`Deletion of ${snsEventId} failed:`, error);
            pendingDeletions--;
            if (pendingDeletions === 0) {
              const newCheckedList = checkedList.filter(
                (id) => !successfullyDeletedIds.includes(id),
              );
              setCheckedList(newCheckedList);
              if (newCheckedList.length === 0) {
                setIsCheckMode(false);
              }
            }
          },
        },
      );
    });
  };

  return (
    <>
      {!isCheckedMode ? (
        <div className="mt-20pxr">
          <ListHeader fileType={FileType.SNS_EVENT_ASSISTANT} />
        </div>
      ) : (
        <div className="mt-7pxr w-full">
          <ListDeleteButton onClick={handleDelete} />
          <div className="mt-8pxr mb-9pxr h-1pxr w-full bg-[#E6E9EF]" />
        </div>
      )}
      <ListFileSnsEventAssistantWrapper
        checkedList={checkedList}
        onCheckModeToggle={setIsCheckMode}
        onCheckedListToggle={setCheckedList}
      />
    </>
  );
};

export default ListFileSnsEventAssistantListWrapper;
