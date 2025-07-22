'use client';

import { useState } from 'react';

import ThirdPartyLogoIcons from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons';
import { ThirdPartyLogoIconsState } from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons.types';

// 테스트할 모든 컴포넌트들을 import 합니다.
import ListFileAiMeetingManager from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManager.client';
import ListFileSnsEventAssistant from '@common/components/list-file/ListFileSnsEventAssistant/ListFileSnsEventAssistant.client';
import ListFileSnsEventAssistantLink from '@common/components/list-file/ListFileSnsEventAssistantLink/ListFileSnsEventAssistantLink.client';
import ListFileTeamMoodTracker from '@common/components/list-file/ListFileTeamMoodTracker/ListFileTeamMoodTracker.client';

// 더미 데이터 (기존과 동일)
const dummyMeetings = [
  { meetingId: 101, title: '주간 AI 기술 동향 공유 회의', updatedAt: '2025년 7월 8일, 10:00 AM' },
  { meetingId: 102, title: '3분기 프로젝트 회고', updatedAt: '2025년 7월 5일, 3:30 PM' },
];
const dummySnsEvents = [
  {
    snsEventId: 201,
    title: '여름 휴가 맞이 SNS 공유 이벤트',
    updatedAt: '2025년 7월 1일, 11:00 AM',
    participantCount: 1024,
    winnerCount: 10,
  },
  {
    snsEventId: 202,
    title: '신제품 출시 기념 퀴즈 이벤트',
    updatedAt: '2025년 6월 28일, 5:00 PM',
    participantCount: 512,
    winnerCount: 5,
  },
];
const dummySnsLinks = [
  {
    snsEventId: 301,
    title: 'SNS 이벤트 결과 발표',
    updatedAt: '2025년 7월 9일, 12:00 PM',
    snsLink: 'https://example.com/event/result/1',
  },
];
const dummySurveys = [
  {
    surveyId: 1,
    title: 'UMC 운영진 정기 회의 만족도 조사',
    createdAt: '2025년 6월 11일, 7:32 PM',
    dueDate: '2025.07.19',
    respondentsNum: 32,
  },
  {
    surveyId: 2,
    title: '상반기 워크샵에 대한 팀원 의견 수렴',
    createdAt: '2025년 6월 12일, 6:00 PM',
    dueDate: '2025.07.20',
    respondentsNum: 29,
  },
];

const ComprehensiveTestPage = () => {
  // 1. 각 리스트 섹션별로 독립적인 상태와 핸들러를 생성합니다.
  const [checkedMeetingIds, setCheckedMeetingIds] = useState<number[]>([]);
  const [checkedSnsEventIds, setCheckedSnsEventIds] = useState<number[]>([]);
  const [checkedSurveyIds, setCheckedSurveyIds] = useState<number[]>([]);

  const handleMeetingToggle = (id: number) => {
    setCheckedMeetingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const handleSnsEventToggle = (id: number) => {
    setCheckedSnsEventIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const handleSurveyToggle = (id: number) => {
    setCheckedSurveyIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const isMeetingsCheckMode = checkedMeetingIds.length > 0;
  const isSnsEventsCheckMode = checkedSnsEventIds.length > 0;
  const isSurveysCheckMode = checkedSurveyIds.length > 0;

  return (
    <div className="flex flex-col items-center p-10">
      <div className="w-full max-w-[1030px]">
        <h1 className="mb-8 text-3xl font-bold">ListFile 컴포넌트 종합 테스트 (상태 분리)</h1>

        {/* AI 미팅 매니저 리스트 */}
        <section className="mb-10">
          <h2 className="mb-2 border-b pb-2 text-2xl font-semibold">AI 미팅 매니저</h2>
          <div className="flex flex-col">
            {dummyMeetings.map((meeting) => (
              <ListFileAiMeetingManager
                key={meeting.meetingId}
                {...meeting}
                isCheckMode={isMeetingsCheckMode}
                isChecked={checkedMeetingIds.includes(meeting.meetingId)}
                onCheckToggle={handleMeetingToggle}
              />
            ))}
          </div>
          {isMeetingsCheckMode && (
            <div className="mt-4 flex items-center gap-x-4 rounded-md bg-gray-100 p-3">
              <p className="font-semibold text-blue-600">{checkedMeetingIds.length}개 선택됨</p>
              <button
                onClick={() => setCheckedMeetingIds([])}
                className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
              >
                선택 해제
              </button>
            </div>
          )}
        </section>

        {/* SNS 이벤트 어시스턴트 리스트 */}
        <section className="mb-10">
          <h2 className="mb-2 border-b pb-2 text-2xl font-semibold">SNS 이벤트 어시스턴트</h2>
          <div className="flex flex-col">
            {dummySnsEvents.map((event) => (
              <ListFileSnsEventAssistant
                key={event.snsEventId}
                {...event}
                isCheckMode={isSnsEventsCheckMode}
                isChecked={checkedSnsEventIds.includes(event.snsEventId)}
                onCheckToggle={handleSnsEventToggle}
              />
            ))}
          </div>
          {isSnsEventsCheckMode && (
            <div className="mt-4 flex items-center gap-x-4 rounded-md bg-gray-100 p-3">
              <p className="font-semibold text-blue-600">{checkedSnsEventIds.length}개 선택됨</p>
              <button
                onClick={() => setCheckedSnsEventIds([])}
                className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
              >
                선택 해제
              </button>
            </div>
          )}
        </section>

        {/* SNS 이벤트 어시스턴트 링크 리스트 (체크 기능 없음) */}
        <section className="mb-10">
          <h2 className="mb-2 border-b pb-2 text-2xl font-semibold">
            SNS 이벤트 링크 (체크 기능 없음)
          </h2>
          <div className="flex flex-col">
            {dummySnsLinks.map((link) => (
              <ListFileSnsEventAssistantLink key={link.snsEventId} {...link} />
            ))}
          </div>
        </section>

        {/* 팀 무드 트래커 리스트 */}
        <section className="mb-10">
          <h2 className="mb-2 border-b pb-2 text-2xl font-semibold">팀 무드 트래커</h2>
          <div className="flex flex-col">
            {dummySurveys.map((survey) => (
              <ListFileTeamMoodTracker
                key={survey.surveyId}
                {...survey}
                isCheckMode={isSurveysCheckMode}
                isChecked={checkedSurveyIds.includes(survey.surveyId)}
                onCheckToggle={handleSurveyToggle}
              />
            ))}
          </div>
          {isSurveysCheckMode && (
            <div className="mt-4 flex items-center gap-x-4 rounded-md bg-gray-100 p-3">
              <p className="font-semibold text-blue-600">{checkedSurveyIds.length}개 선택됨</p>
              <button
                onClick={() => setCheckedSurveyIds([])}
                className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
              >
                선택 해제
              </button>
            </div>
          )}
        </section>
      </div>
      <ThirdPartyLogoIcons state={ThirdPartyLogoIconsState.SIZE_22_INSTAGRAM} />
    </div>
  );
};

export default ComprehensiveTestPage;
