'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import useSnsEvent from '@api/sns-event-assistant/get/queries/useSnsEvent';
import useUpdateSnsEventMutation from '@api/sns-event-assistant/patch/mutations/useUpdateSnsEventMutation';

import { GnbSection } from '@common/types/gnbs.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import RosterList from '@common/components/RosterList/RosterList.server';
import DownloadButton from '@common/components/buttons/30px/DownloadButton/DownloadButton.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import SnsLinkItem from '@features/sns-event-assistant/components/SnsLinkItem/SnsLinkItem.client';

const mockItems = [
  {
    userId: 'user1',
  },
  {
    userId: 'user2',
  },
  {
    userId: 'user3',
  },
  {
    userId: 'user4',
  },
  {
    userId: 'user5',
  },
  {
    userId: 'user6',
  },
];
const mockWinnerItems = [
  {
    userId: 'user1',
  },
  {
    userId: 'user2',
  },
  {
    userId: 'user3',
  },
];
enum SnsCategory {
  PARTICIPANT = 'PARTICIPANT',
  WINNER = 'WINNER',
  LINK = 'LINK',
}

const SnsEventAssistantDetailPage = () => {
  const [mode, setMode] = useState<InputFileTitleMode>(InputFileTitleMode.DEFAULT);
  const type = useSearchParams().get('type');
  const { workspaceId, snsEventId } = useParams<{ workspaceId?: string; snsEventId?: string }>();
  const router = useRouter();
  const items = type === SnsCategory.WINNER ? mockWinnerItems : mockItems;
  const handleClick = (type: SnsCategory) => {
    router.push(`/workspace/${workspaceId}/sns-event-assistant/${snsEventId}?type=${type}`);
  };
  const [title, setTitle] = useState<string>('');

  const { extra: sns } = useSnsEvent(snsEventId || '');

  useEffect(() => {
    if (sns?.title !== title) {
      setTitle(sns?.title ?? '');
    }
  }, [sns]);

  const { mutate } = useUpdateSnsEventMutation();
  const handleTitleSave = (newTitle: string) => {
    console.log(snsEventId, newTitle);
    mutate(
      { snsEventId: snsEventId || '', title: newTitle },
      {
        onSuccess: () => {
          if (!newTitle) return;
          setTitle(newTitle);
        },
      },
    );
  };
  return (
    <section>
      <GnbTop section={GnbSection.CUSTOM} title={title} />
      <div className="flex w-full flex-col">
        {/* 상단 부분 */}
        <div className="border-b-stroke-200 flex w-full justify-center border-b border-solid bg-white">
          <div className="w-668pxr">
            <div className="gap-16pxr mt-24pxr flex flex-col">
              <InputFileTitle value={title} onSave={handleTitleSave} mode={mode} onMode={setMode} />
              <FileCreatedInfo name={'이름'} userId={'id'} dateTime={new Date().toISOString()} />
            </div>
            <div className="mt-23pxr mb-13pxr flex w-full justify-between">
              <div className="gap-x-8pxr flex">
                <CategoryOption
                  label="참여자 리스트"
                  active={type === SnsCategory.PARTICIPANT || !type}
                  count={1}
                  onClick={() => handleClick(SnsCategory.PARTICIPANT)}
                />
                <CategoryOption
                  label="당첨자 리스트"
                  active={type === SnsCategory.WINNER}
                  count={1}
                  onClick={() => handleClick(SnsCategory.WINNER)}
                />
                <CategoryOption
                  label="SNS 링크"
                  active={type === SnsCategory.LINK}
                  onClick={() => handleClick(SnsCategory.LINK)}
                />
              </div>
              {type !== SnsCategory.LINK && (
                <div className="gap-x-12pxr flex items-center">
                  <div className="cursor-pointer" onClick={() => {}}>
                    <FeatureTabIcons state={FeatureTabIconsState.COPY} />
                  </div>
                  <DownloadButton onClick={() => {}} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 하단 부분 */}
        <div className="mt-28pxr flex w-full justify-center">
          {type == SnsCategory.LINK ? (
            <SnsLinkItem title="Link Title" link="https://example.com" onClick={() => {}} />
          ) : (
            <>
              <RosterList items={items} />
              <RosterList items={items} hasLeftBorder={true} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SnsEventAssistantDetailPage;
