'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';

import { SnsGnbTabLabels, sectionConfigs } from '@common/constants/gnbs.constants';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import InputSearchBox from '@common/components/inputs/InputSearchBox/InputSearchBox.client';

import { GnbTopProps } from './GnbTop.types';

const SEARCH_PATH_MAP: Partial<Record<GnbSection, string>> & { default: string } = {
  [GnbSection.AI_MEETING_MANAGER]: 'ai-meeting-manager/search',
  [GnbSection.SNS_EVENT_ASSISTANT]: 'sns-event-assistant/search',
  [GnbSection.TEAM_MOOD_TRACKER]: 'team-mood-tracker/search',
  [GnbSection.MAIN]: 'search',
  [GnbSection.CALENDAR]: 'calendar/search',
  default: 'search', // 기본 경로
};

const GnbTop = ({ section, title, current, isSnsEventAssistantWithoutWorkspace }: GnbTopProps) => {
  const pathname = usePathname() ?? '';
  const params = useParams<{ workspaceId?: string }>();

  const searchPath = params.workspaceId
    ? `/workspace/${params.workspaceId}/${SEARCH_PATH_MAP[section] ?? SEARCH_PATH_MAP.default}`
    : '#';

  const config =
    section === GnbSection.CUSTOM ? sectionConfigs[section](title ?? '') : sectionConfigs[section];

  const isSnsEventAssistant = section === GnbSection.SNS_EVENT_ASSISTANT;
  const isCustomSection = section === GnbSection.CUSTOM;

  return (
    <div className="flex w-full flex-col items-start">
      {/* 상단 제목 */}
      <div className="border-b-stroke-200 h-60pxr py-13pxr flex items-center justify-between self-stretch border-b border-solid bg-white px-6">
        <p className="text-t3-sb text-black">{config.title}</p>
        {!isCustomSection && <InputSearchBox searchHref={searchPath} />}
      </div>
      {!isCustomSection && (
        // 하단 탭 or 단순 옵션
        <div className="border-b-stroke-200 py-13pxr flex h-14 items-center gap-2.5 self-stretch border-b border-solid bg-white px-6">
          {isSnsEventAssistant
            ? (Object.keys(SnsGnbTabLabels) as SnsGnbTabType[]).map((tab) => {
                const params = new URLSearchParams();
                params.set('snsGnbTab', tab);

                const isActive = isSnsEventAssistantWithoutWorkspace
                  ? tab === SnsGnbTabType.ALL_EVENTS // workspace 없으면 ALL_EVENTS만 active
                  : current === tab; // 그 외엔 current 비교

                // workspace 없는 경우 ALL_EVENTS만 활성화
                const isDisabled =
                  isSnsEventAssistantWithoutWorkspace && tab !== SnsGnbTabType.ALL_EVENTS;

                const route = `${pathname}?${params.toString()}`;

                return isSnsEventAssistantWithoutWorkspace ? (
                  <div key={tab}>
                    <CategoryOption
                      label={SnsGnbTabLabels[tab]}
                      active={isActive}
                      disabled={isDisabled}
                    />
                  </div>
                ) : (
                  <Link key={tab} href={route}>
                    <CategoryOption label={SnsGnbTabLabels[tab]} active={isActive} />
                  </Link>
                );
              })
            : config.options.map((option) => (
                <CategoryOption key={option.key} label={option.label} active />
              ))}
        </div>
      )}
    </div>
  );
};

export default GnbTop;
