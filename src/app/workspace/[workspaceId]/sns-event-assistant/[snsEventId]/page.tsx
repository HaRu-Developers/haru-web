'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import useSnsEvent from '@api/sns-event-assistant/get/queries/useSnsEvent';
import useUpdateSnsEventMutation from '@api/sns-event-assistant/patch/mutations/useUpdateSnsEventMutation';

import { GnbSection } from '@common/types/gnbs.types';

import { ROUTES } from '@common/constants/routes.constants';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import RosterList from '@common/components/RosterList/RosterList.server';
import DownloadButton from '@common/components/buttons/30px/DownloadButton/DownloadButton.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import SnsLinkItem from '@features/sns-event-assistant/components/SnsLinkItem/SnsLinkItem.client';

enum SnsCategory {
  PARTICIPANT = 'PARTICIPANT',
  WINNER = 'WINNER',
  LINK = 'LINK',
}

const SnsEventAssistantDetailPage = () => {
  const [mode, setMode] = useState<InputFileTitleMode>(InputFileTitleMode.DEFAULT);
  const type = useSearchParams().get('type');
  const { workspaceId, snsEventId } = useParams<{ workspaceId: string; snsEventId: string }>();
  const router = useRouter();
  const { extra: sns } = useSnsEvent(snsEventId);
  const items = type === SnsCategory.WINNER ? sns?.winnerList : sns?.participantList;
  const leftItems = items?.filter((_, index) => index < items.length / 2) ?? [];
  const rightItems = items?.filter((_, index) => index >= items.length / 2) ?? [];
  const handleClick = (type: SnsCategory) => {
    router.push(ROUTES.SNS_EVENT_ASSISTANT.DETAIL(workspaceId, snsEventId, type));
  };
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (sns?.title !== title) {
      setTitle(sns?.title ?? '');
    }
  }, [sns, title]);

  const { mutate } = useUpdateSnsEventMutation();
  const handleTitleSave = (newTitle: string) => {
    console.log(snsEventId, newTitle);
    mutate(
      { snsEventId, title: newTitle },
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
              <FileCreatedInfo
                name={sns?.creatorName ?? ''}
                userId={sns?.creatorId ?? ''}
                dateTime={''}
              />
            </div>
            <div className="mt-23pxr mb-13pxr flex w-full justify-between">
              <div className="gap-x-8pxr flex">
                <CategoryOption
                  label="참여자 리스트"
                  active={type === SnsCategory.PARTICIPANT || !type}
                  count={sns?.participantList?.length ?? 0}
                  onClick={() => handleClick(SnsCategory.PARTICIPANT)}
                />
                <CategoryOption
                  label="당첨자 리스트"
                  active={type === SnsCategory.WINNER}
                  count={sns?.winnerList?.length ?? 0}
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
            <SnsLinkItem title={title} link={sns?.snsLink ?? ''} onClick={() => {}} />
          ) : (
            <>
              <RosterList items={leftItems ?? []} />
              <RosterList items={rightItems ?? []} hasLeftBorder={true} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SnsEventAssistantDetailPage;
